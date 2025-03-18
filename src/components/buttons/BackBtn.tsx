import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({url}: {url: string}) => {
  const navigate = useNavigate();
  return (
    <button
      className='back-button flex hover:cursor-pointer'
      onClick={() => navigate(url)}
    >
      <ArrowLeft size={20} color='#ffffff' />
      <p className='text-sm ml-1'> Back</p>
    </button>
  );
};

export default BackButton;
