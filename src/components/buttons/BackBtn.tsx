import { ArrowLeft } from 'lucide-react';

const BackButton = ({ text }: { text?: string }) => {
  return (
    <button
      className='back-button flex hover:cursor-pointer'
      onClick={() => history.back()}
      tabIndex={0}
      aria-label='Back'
    >
      <ArrowLeft size={20} color='#ffffff' />
      <p className='text-sm ml-1'>{text || 'Back'}</p>
    </button>
  );
};

export default BackButton;
