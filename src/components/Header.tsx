import { Link } from 'react-router-dom';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='bg-gray-900 flex flex-1 justify-between items-center px-4 mt-2'>
      <h1>
        <Link to='/' className='font-fakeId text-2xl'>
          Movies Unlimited
        </Link>
      </h1>
      <div>{children}</div>
    </header>
  );
};

export default Header;
