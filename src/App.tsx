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

  const [updateAvailable, setUpdateAvailable] = useState(false);

  const updateSW = registerSW({
    onNeedRefresh() {
      setUpdateAvailable(true);
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
      {updateAvailable && (
        <div className='z-100 fixed h-10 bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center'>
          <span>A new update is available!</span>
          <button
            className='bg-white text-blue-800 text-sm h-6 p-3 rounded flex items-center justify-center'
            onClick={() => {
              updateSW();
              setUpdateAvailable(false);
            }}
          >
            Reload
          </button>
        </div>
      )}
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
