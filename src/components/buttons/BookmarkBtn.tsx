import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useStore } from '../../state/store';
import { useShallow } from 'zustand/react/shallow';
interface BookmarkBtnProps {
  id: string | number;
  type: string;
  isBookmarked: boolean;
  iconSize?: number;
  color?: string;
}

const BookmarkBtn = ({
  id,
  type,
  isBookmarked: propIsBookmarked,
  iconSize = 40,
  color = 'white',
}: BookmarkBtnProps) => {
  const openModal = useStore(useShallow((state) => state.openModal));

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(id as string, type);
  };

  return (
    <button className='' onClick={handleBookmarkToggle}>
      {propIsBookmarked ? (
        <BookmarkCheck className='mx-auto' size={iconSize} color={color} />
      ) : (
        <Bookmark className='mx-auto' size={iconSize} color={color} />
      )}
    </button>
  );
};

export default BookmarkBtn;
