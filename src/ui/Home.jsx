import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    // my-10 دا بيطبق علي اي شاشه اقل من 640
    //بما أن Tailwind Mobile-First، أي شيء بدون prefix يُعتبر افتراضي للموبايل.
    <div className='my-10 px-4 text-center sm:my-16'>
      <h1 className='mb-4 text-xl font-semibold md:text-3xl'>
        The best pizza.
        <br />
        <span className='text-yellow-500'>
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to='/menu' type='primary'>
          continue ordering,{username}
        </Button>
      )}
    </div>
  );
}

export default Home;
