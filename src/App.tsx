import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/header/nav/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScrollRestoration } from 'react-router-dom';
import BookmarkModal from './components/modals/BookmarkModal';
import { useEffect } from 'react';
import { isSmartTvBrowser } from './utils/helpers';


function App() {
  const isTvBrowser = isSmartTvBrowser();

  useEffect(() => {
    fetch(
      'https://bingebox-server-54dc60d03f7d.herokuapp.com/api/video/wakeup',
    ).then((res) => {
      console.log('wake up status', res.status);
    });
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
        <Header isTvBrowser={isTvBrowser}>
          <Nav />
        </Header>
        <main
          className='min-h-screen'
          style={{ paddingTop: isTvBrowser ? '10.5rem' : undefined }}
        >
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
