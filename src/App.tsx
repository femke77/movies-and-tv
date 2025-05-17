import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/header/nav/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScrollRestoration } from 'react-router-dom';

import BookmarkModal from './components/modals/BookmarkModal';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        'https://bingebox-server-54dc60d03f7d.herokuapp.com/api/video/wakeup',
      ).then((res) => {
        console.log('wake up status', res.status);
      });
    }, 600000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <ScrollRestoration />
      <div className='bg-black text-white h-full '>
        <Header>
          <Nav />
        </Header>
        <main className='min-h-screen  '>
          <Outlet />
        </main>
        <Footer />
      </div>
      <BookmarkModal />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
