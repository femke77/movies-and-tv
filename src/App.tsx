import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/header/nav/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScrollRestoration } from 'react-router-dom';
import BookmarkModal from './components/modals/BookmarkModal';
import { useEffect } from 'react';
import { isSmartTvBrowser } from './utils/helpers';
import { getApiUrl } from './utils/api';


function App() {
  const isTvBrowser = isSmartTvBrowser();

  useEffect(() => {
    fetch(getApiUrl('/api/video/wakeup')).then((res) => {
      console.log('wake up status', res.status);
    });
    const interval = setInterval(() => {
      fetch(getApiUrl('/api/video/wakeup')).then((res) => {
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
      <div
        className='bg-black text-white h-full'
        style={{
          transform: isTvBrowser ? 'translateY(1.25rem)' : undefined,
          transformOrigin: 'top center',
        }}
      >
        <Header isTvBrowser={isTvBrowser}>
          <Nav isTvBrowser={isTvBrowser} />
        </Header>
        <main className='min-h-screen'>
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
