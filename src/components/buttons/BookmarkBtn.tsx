import { Bookmark, BookmarkCheck } from 'lucide-react';

const BookmarkBtn = ({
  id,
  type,

  isBookmarked,
}: {
  id: string;
  type: string;
  isBookmarked: boolean;
}) => {
  const handleClick = () => {
    if (isBookmarked) {
      const bookmarks = localStorage.getItem(`bookmarks-${type}`);
      if (bookmarks) {
        // add to bookmarks
      } else {
        const bookmarks = localStorage.getItem(`bookmarks-${type}`);

        if (bookmarks) {
          // remove from bookmarks
        }
      }
    }
  };
  return (
    <button value={id} onClick={handleClick}>
      {isBookmarked ? <BookmarkCheck /> : <Bookmark />}
    </button>
  );
};

export default BookmarkBtn;
