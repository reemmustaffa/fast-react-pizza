import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ oredr }) {
  const fetcher = useFetcher();

  //دي علي عكس الفورم التانيه اللي اول لما اعمل سبمت توديني لصفحه تانيه انما دي هتخليني في نفس الصفحه
  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  // revalidation:بتخلي ريأكت يعرف ان بعض الداتا اتغيرت نتيجه للاكشن دا فبيحصل ان بعمل ريفتش للداتا تاني وبالتالي بيحصل ريرندر
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

// put:الغرض: تحديث مورد كامل (Full Update).
//patch:الغرض: تحديث جزء من المورد فقط (Partial Update).
