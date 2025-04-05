import ContinueWatching from '../../components/main/ContinueWatching';
import { useStore } from '../../state/store';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { useState } from 'react';

const History = () => {
  const { previousSearches, clearPreviousSearches } = useStore(
    (state) => state
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='w-full h-full  mt-36'>
      <ContinueWatching />
      <div className='flex justify-between items-end'>
      <h1 className='mt-12 text-2xl font-semibold ml-6'>
        Previous Search History
      </h1>
        <button
          onClick={() => setShowModal(true)}
          className='bg-gray-700 h-7 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
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
      <div className='flex flex-col gap-2 mt-4 ml-6'>
        {previousSearches.length > 0 ? (<>{previousSearches?.map((item, index) => (
          <div key={index} className='text-white text-md'>
            <Link to={`/search/${item}`}> {item}</Link>
          </div>
        ))}</>) : (<p>Your previous searches will appear here.</p>) }
      </div>
    </div>
  );
};

export default History;
