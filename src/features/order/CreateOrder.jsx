import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((store) => store.user);

  const isLoadingAddress = addressStatus === 'laoding';
  const isSubmitting = navigation.state === 'submitting';

  const dispatch = useDispatch();

  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  //دا بيرجع اي حاجه جايه من الاكشن في حاله مفيش سبمت
  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form method='POST' action='/order/new'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            type='text'
            name='customer'
            required
            className='input grow'
            defaultValue={username}
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input type='tel' name='phone' required className='input w-full' />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              className='input w-full'
            />
            {addressError && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className='absolute right-[3px] top-[3px] z-50 sm:right-[5px] sm:top-[8px]'>
              <Button
                type='small'
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className='mb-12 flex gap-5'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          {/* السيرفر ممكن يخزن مكان الأوردر بدقة (مفيد للدليفري). عشان يحدد العنوان يدقه  */}
          <input
            type='hidden'
            name='position'
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>
            {isSubmitting
              ? 'placing order...'
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  //request.formData() = يجيب بيانات الفورم.
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number.we might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  //هنا ببعت الاوردر ل اللينك اللي ب id دا
  //if everything is okey, create newoder and redirect
  const newOrder = await createOrder(order);
  // console.log(newOrder);

  //DON NOT OVERUSE
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

// createOrder = بيبعت بيانات → السيرفر يخزنها → السيرفر يولّد id ويرجع response.

// getOrder = بيطلب من السيرفر يرجّع نفس الأوردر اللي اتخزن باستخدام id
