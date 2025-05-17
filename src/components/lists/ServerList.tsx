import { Settings } from 'lucide-react';

interface IServer {
  id: number;
  name: string;
  value: string;
}

const ServerButton = ({
  name,
  value,
  selectedServer,
  setSelectedServer,
}: {
  name: string;
  value: string;
  selectedServer: string;
  setSelectedServer: (_server: string) => void;
}) => {
  return (
    <button
      value={value}
      onClick={(e) => setSelectedServer(e.currentTarget.value)}
      className={`flex items-center w-full p-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-lg mb-2 hover:cursor-pointer hover:translate-[1px] active:translate-[1px] ${
        selectedServer === value
          ? 'border-2 border-blue-600'
          : 'border-2 border-transparent'
      }`}
    >
      <Settings size={20} className='mr-4' color='#ffffff' />
      <p>{name}</p>
    </button>
  );
};

const ServerList = ({
  serverData,
  selectedServer,
  setSelectedServer,
}: {
  serverData: IServer[];
  selectedServer: string;
  setSelectedServer: (_server: string) => void;
}) => {
  return (
    <div className='max-h-[900px] p-[16px] '>
      <h1 className='text-lg mb-3 text-center'>Change Server</h1>
      {serverData &&
        serverData.map(
          (server: { id: number; name: string; value: string }) => (
            <ServerButton
              key={server.id}
              name={server.name}
              value={server.value}
              selectedServer={selectedServer}
              setSelectedServer={setSelectedServer}
            />
          ),
        )}
    </div>
  );
};

export default ServerList;
