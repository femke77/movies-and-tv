import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/header/nav/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScrollRestoration } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookmarkModal from './components/modals/BookmarkModal';
import { registerSW } from 'virtual:pwa-register';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const updateSW = registerSW({
    onNeedRefresh() {
      if (window.confirm('A new update is available. Reload now?')) {
        updateSW(true); 
      }
    },
    onOfflineReady() {
      console.log('App is ready to work offline.');
    },
  });

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
