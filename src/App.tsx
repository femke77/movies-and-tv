import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/header/nav/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScrollRestoration } from 'react-router-dom';
import BookmarkModal from './components/modals/BookmarkModal';
import { isSmartTvBrowser } from './utils/helpers';

function App() {
  const isTvBrowser = isSmartTvBrowser();

  return (
    <>
      <ScrollRestoration />
      <div className='bg-black text-white h-full'>
        <Header isTvBrowser={isTvBrowser}>
          <Nav isTvBrowser={isTvBrowser} />
        </Header>
        <main
          className='min-h-screen'
          style={
            isTvBrowser
              ? {
                  paddingTop: 'calc(5rem + env(safe-area-inset-top, 0px))',
                }
              : undefined
          }
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
