import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <div className='bg-black text-white h-full'>
      <ReactQueryDevtools />
      <Header>
        <Nav />
      </Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
