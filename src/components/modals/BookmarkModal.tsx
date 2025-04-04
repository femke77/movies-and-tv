import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useStore } from '../../state/store';

export default function BookmarkModal() {
  const { showModal, modalData, closeModal, addBookmark, removeBookmark } =
    useStore();

  if (!modalData) return null;

  const { id, type, isBookmarked } = modalData;

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeBookmark(id, type);
      closeModal();
    } else {
      addBookmark(id, type);
      closeModal();
    }
  };

  return (
    <Dialog
      open={showModal}
      as='div'
      className='relative z-100'
      onClose={closeModal}
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-900/90 flex items-center justify-center p-4'>
        <DialogPanel className='w-full max-w-md bg-black p-6 rounded-xl'>
          <DialogTitle
            id='modal-title'
            as='h3'
            className='text-lg font-semibold text-white'
          >
            {isBookmarked
              ? 'Remove this from your watchlist?'
              : 'Add this to your watchlist?'}
          </DialogTitle>

          <div className='mt-4 flex gap-4'>
            <Button
              className='bg-gray-700 text-white px-3 py-1.5 rounded-md'
              onClick={handleBookmarkToggle}
            >
              {isBookmarked ? 'Remove' : 'Add'}
            </Button>
            <Button
              className='bg-red-600 text-white px-3 py-1.5 rounded-md'
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
