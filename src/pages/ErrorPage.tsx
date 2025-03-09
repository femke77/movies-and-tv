import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className='text-white/70 flex flex-col items-center justify-center h-screen text-4xl space-y-6'>
      <h1>An Unexpected Error Occured. We're Sorry!</h1>
      <h1> ¯\_(ツ)_/¯</h1>
      <Link to='/' className='text-blue-500 underline'>
        Go back home
      </Link>
    </section>
  );
};

export default ErrorPage;
