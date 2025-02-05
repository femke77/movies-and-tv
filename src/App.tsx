import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  return (
    <div className='bg-black text-white h-full'>
      <Header>
        <Nav />
      </Header>
      <main className='h-full'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
