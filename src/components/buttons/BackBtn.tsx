import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ type, url }: { type: string; url: string }) => {
  const navigate = useNavigate();
  return (
    <button
      className='back-button flex hover:cursor-pointer'
      onClick={() => navigate(url, { replace: true })}
    >
      <ArrowLeft size={20} color='#ffffff' />
      <p className='text-sm ml-1'>{type} Details</p>
    </button>
  );
};

export default BackButton;
