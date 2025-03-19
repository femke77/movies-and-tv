interface BookmarkModalProps {
  id: string;
  type: string;
  isBookmarked: boolean;
  onBookmarkChange: (
    _id: string,
    _type: string,
    _isBookmarked: boolean,
  ) => void;
}

const BookmarkModal = ({
  id,
  type,
  isBookmarked,
  onBookmarkChange,
}: BookmarkModalProps) => {
  // Function to add bookmark to local storage
  const addBookmark = () => {
    try {
      // Get existing bookmarks
      const bookmarksString = localStorage.getItem('bookmarks');
      const bookmarks = bookmarksString ? JSON.parse(bookmarksString) : [];

      // Add new bookmark if it doesn't exist already
      const exists = bookmarks.some(
        (bookmark: { id: string; type: string }) =>
          bookmark.id === id && bookmark.type === type,
      );

      if (!exists) {
        bookmarks.push({ id, type, timestamp: Date.now() });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        // Notify parent about the change
        onBookmarkChange(id, type, true);
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  // Function to remove bookmark from local storage
  const removeBookmark = () => {
    try {
      // Get existing bookmarks
      const bookmarksString = localStorage.getItem('bookmarks');
      if (!bookmarksString) return;

      const bookmarks = JSON.parse(bookmarksString);

      // Filter out the bookmark to remove
      const updatedBookmarks = bookmarks.filter(
        (bookmark: { id: string; type: string }) =>
          !(bookmark.id === id && bookmark.type === type),
      );

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

      // Notify parent about the change
      onBookmarkChange(id, type, false);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  // Close the modal and update the bookmark status
  const handleAction = (action: 'add' | 'remove') => {
    if (action === 'add') {
      addBookmark();
    } else {
      removeBookmark();
    }

    // Close the modal
    const modalElement = document.getElementById(
      'my_modal_3',
    ) as HTMLDialogElement | null;
    if (modalElement) modalElement.close();
  };

  // Rest of your modal code...

  return (
    <dialog id='my_modal_3' className='modal'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Bookmark</h3>
        <p className='py-2 text-black'>
          {isBookmarked
            ? 'Remove item from bookmark?'
            : 'Do you want to add this item to your bookmarks?'}
        </p>
        <div className='modal-action'>
          <form method='dialog'>
            {/* Close button */}
            <button className='btn mr-2'>Cancel</button>
            {/* Action button */}
            <button
              type='button'
              className='btn bg-blue-600 text-white'
              onClick={() => handleAction(isBookmarked ? 'remove' : 'add')}
            >
              {isBookmarked ? 'Remove' : 'Add'} Bookmark
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default BookmarkModal;
