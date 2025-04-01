import { ArrowLeft } from 'lucide-react';

const BackButton = ({ text, color='text-gray-300/80' }: { text?: string, color?:string }) => {
  return (
    <button
      className='back-button flex hover:cursor-pointer'
      onClick={() => history.back()}
      tabIndex={0}
      aria-label='Back'
    >
      <ArrowLeft size={20} color='#ffffff' />
      <p className={`  text-sm ml-1 ${color}`}>{text || 'Back'}</p>
    </button>
  );
};

export default BackButton;
