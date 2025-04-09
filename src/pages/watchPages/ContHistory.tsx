import ContinueWatching from '../../components/main/ContinueWatching';
import { useStore } from '../../state/store';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { useState } from 'react';
import useDocumentTitle from '../../hooks/usePageTitles';
import BackButton from '../../components/buttons/BackBtn';
import { useShallow } from 'zustand/react/shallow';

const History = () => {
  const { previousSearches, clearPreviousSearches } = useStore(
    useShallow((state) => state)
  );
  const [showModal, setShowModal] = useState(false);
  useDocumentTitle('Watch History | BingeBox');
  return (
    <div className='z-10 w-full h-full mt-26'>
      <div className='absolute top-20 left-3 z-10 mb-10'>
        <BackButton />
      </div>
      <div className='fixed inset-0 z-0 bg-gradient-to-r from-black to-neutral-800' />
      <div className='z-10 flex justify-between items-end mt-6'>
        <h1 className='z-10 mt-6 text-2xl font-semibold ml-6 text-white/70 mr-6'>
          Previous Search History
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className='bg-gray-700 z-10 h-7 min-w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-13'
        >
          Clear All
        </button>
      </div>
      <ConfirmModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        handleClick={() => {
          clearPreviousSearches();
          setShowModal(false);
        }}
        message='Are you sure you want to clear your search history?'
      />
      <div className='z-10 flex flex-col gap-2 mt-4 ml-6'>
        {previousSearches.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2  gap-2 my-6'>
            {previousSearches?.map((item, index) => (
              <div key={index} className='text-white z-10 text-md'>
                <Link to={`/search/${item}`}> {item}</Link>
              </div>
            ))}
          </div>
        ) : (
          <p className='z-10'>Your previous searches will appear here.</p>
        )}
      </div>

      <h1 className='z-10 top-7 ml-6 relative text-2xl font-semibold text-white/70 '>
        Continue Watching
      </h1>
      <div className='mx-auto w-[95%] mb-20'>
        <ContinueWatching showCarousel={false} />
      </div>
    </div>
  );
};

export default History;
