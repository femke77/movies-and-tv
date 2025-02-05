import { Link } from 'react-router-dom';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className='flex flex-1 justify-between items-center mx-4'>
      <h1>
        <Link to='/'>Movies Unlimited</Link>
      </h1>
      <div>{children}</div>
    </header>
  );
};

export default Header;
