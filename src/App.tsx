import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/NavComponents/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScrollRestoration } from 'react-router-dom';
import { useEffect, useState } from 'react';

// TODO finish footer

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // maintains search query on reload
  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem('searchQuery', searchQuery);
    } else {
      const query = localStorage.getItem('searchQuery');
      if (query) setSearchQuery(query);
    }
  }, [searchQuery]);

  useEffect(() => {
    document.addEventListener(
      'focus',
      () => {
        console.log(document.activeElement);
      },
      true,
    );
  }, []);

  return (
    <>
      <ScrollRestoration />
      <div className='bg-black text-white h-full'>
        <Header>
          <Nav setSearchQuery={setSearchQuery} />
        </Header>
        <main className='min-h-screen  '>
          <Outlet context={searchQuery} />
        </main>
        <Footer />
      </div>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
