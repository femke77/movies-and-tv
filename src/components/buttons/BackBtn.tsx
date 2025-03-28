import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ url }: { url: string }) => {
  const navigate = useNavigate();
  return (
    <button
      className='back-button flex hover:cursor-pointer'
      onClick={() => navigate(url, { replace: true })}
    >
      <ArrowLeft size={20} color='#ffffff' />
      <p className='text-sm ml-1'>Details</p>
    </button>
  );
};

export default BackButton;
