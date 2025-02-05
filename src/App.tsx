import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div className='bg-black text-white h-full'>
      <Header>
        <Nav />
      </Header>
      <main className=''>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
