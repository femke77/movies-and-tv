import { Settings } from 'lucide-react';
import serverData from '../../utils/data/servers.json';

const ServerButton = ({ name, value }: { name: string; value: string }) => {
  return (
    <button
      value={value}
      className='flex items-center w-full p-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-lg mb-2 hover:cursor-pointer hover:translate-[1px] active:translate-[1px]'
    >
      <Settings size={20} className='mr-4' color='#ffffff' />
      <p>{name}</p>
    </button>
  );
};

const ServerList = () => {
  const { servers } = serverData;
  return (
    <div className='max-h-[600px] p-[16px] '>
      <h1 className='text-lg mb-3 text-center'>Change Server</h1>
      {servers &&
        servers.map((server: { id: number; name: string; value: string }) => (
          <ServerButton
            key={server.id}
            name={server.name}
            value={server.value}
          />
        ))}
    </div>
  );
};

export default ServerList;
