import { Link } from 'react-router-dom';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='bg-gray-900 flex flex-1 justify-between items-center px-4 my-2 z-50 relative'>
      <h1>
        <Link to='/' className='font-fakeId text-3xl'>
          Movies Unlimited
        </Link>
      </h1>
      <div>{children}</div>
    </header>
  );
};

export default Header;
