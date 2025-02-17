import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScrollRestoration } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // maintain search query on reload
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
      <div className='bg-black text-white h-full'>
        <Header>
          <Nav setSearchQuery={setSearchQuery} />
        </Header>
        <main className='min-h-screen'>
          <Outlet context={searchQuery} />
        </main>
        <Footer />
      </div>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
