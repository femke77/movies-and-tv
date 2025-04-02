import { ArrowLeft } from 'lucide-react';

const BackButton = ({
  text,
  color = 'text-white/60',
}: {
  text?: string;
  color?: string;
}) => {
  return (
    <button
      className='back-button flex hover:cursor-pointer'
      onClick={() => history.go(-1)}
      tabIndex={0}
      aria-label='Back'
    >
      <ArrowLeft size={20} color='#ffffff' />
      <p className={`  text-sm ml-1 ${color}`}>{text || 'Back'}</p>
    </button>
  );
};

export default BackButton;
