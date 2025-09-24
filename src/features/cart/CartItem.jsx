import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { getCurrentQuantity } from './cartSlice';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 font-semibold sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          curentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
