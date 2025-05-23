import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/usePageTitles';
const NotFound = () => {
  useDocumentTitle('404: Page Not Found | BingeBox');
  return (
    <section className='text-white/70 flex flex-col items-center justify-center h-screen text-4xl space-y-6'>
      <h1>404: Page Not Found</h1>
      <h1> ¯\_(ツ)_/¯</h1>
      <Link to='/' className='text-blue-500 underline'>
        Go back home
      </Link>
    </section>
  );
};

export default NotFound;
