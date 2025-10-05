function Loader() {
  return (
    // Inset=>بتحط هنا في جميع الاتجاهات 0
    <div className='absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm'>
      <div className='loader'></div>
    </div>
  );
}

export default Loader;
