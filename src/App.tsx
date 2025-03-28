import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/nav/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScrollRestoration } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useBookmarkStore } from './state/store';
import BookmarkModal from './components/modals/BookmarkModal';
import { registerSW } from 'virtual:pwa-register';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const updateSW = registerSW({
      immediate: true,
      // using autoUpdate so the below code, onNeedRefresh, isn't running. Might switch to prompt.
      onNeedRefresh() {
        if (
          confirm('A new version is available. Do you want to reload the page?')
        ) {
          updateSW(true).catch(console.error);
        }
      },
      onOfflineReady() {
        console.log('SW - Offline ready');
      },
      onRegistered(registration) {
        console.log('SW Registration successful:', registration);
        setInterval(() => {
          console.log('Checking for SW updates...');
          registration?.update().catch(console.error);
        }, 300000);
      },
      onRegisterError(error) {
        console.error('SW registration failed:', error);
      },
    });
  }, []);

  // maintains search query on reload
  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem('searchQuery', searchQuery);
    } else {
      const query = localStorage.getItem('searchQuery');
      if (query) setSearchQuery(query);
    }
  }, [searchQuery]);

  return (
    <>
      <ScrollRestoration />
      <div className='bg-black text-white h-full '>
        <Header>
          <Nav setSearchQuery={setSearchQuery} />
        </Header>
        <main className='min-h-screen  '>
          <Outlet context={searchQuery} />
        </main>
        <Footer />
      </div>
      <BookmarkModal />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
