import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScrollRestoration } from 'react-router-dom';
function App() {
  return (
    <>
      <div className='bg-black text-white h-full'>
        <Header>
          <Nav />
        </Header>
        <main className='min-h-screen'>
          <ScrollRestoration />
          <Outlet />
        </main>
        <Footer />
      </div>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
