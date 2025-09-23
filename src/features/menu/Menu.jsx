import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
function Menu() {
  //useLoaderData:بيوفرلك البيانات اللي loader رجعها للـ route الحالي.
  const menu = useLoaderData();
  return (
    <ul className='divide-y divide-stone-200 px-2'>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//تحميل البيانات المتعلقة بالصفحة عند الدخول للـ route بتاعها
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
