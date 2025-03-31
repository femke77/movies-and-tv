import { ArrowLeft } from 'lucide-react';


const BackButton = ({ text }: {  text?:string }) => {

  return (
    <button
      className='back-button flex hover:cursor-pointer'
      onClick={ () => history.back() }
     
      tabIndex={0}
      role='button'
      aria-label='Back'
      aria-hidden='true'
    >
      <ArrowLeft size={20} color='#ffffff' />
      <p className='text-sm ml-1'>{text || 'Back'}</p>
    </button>
  );
};

export default BackButton;
