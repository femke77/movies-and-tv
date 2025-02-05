import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <Header>
        <Nav />
      </Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
