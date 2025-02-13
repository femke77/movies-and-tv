import { Link } from 'react-router-dom';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='bg-gray-900 flex flex-1 justify-between items-center px-3 z-50 relative pt-1'>
      <h1>
        <Link to='/' className='font-kyrilla text-2xl sm:text-3xl py-2 mr-8'>
          Movies Unlimited
        </Link>
      </h1>
      <div>{children}</div>
    </header>
  );
};

export default Header;
