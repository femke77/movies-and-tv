import { Bookmark, BookmarkCheck } from 'lucide-react';
import Tooltip from '../ToolTip';
import { useBookmarkStore } from '../../state/store';

interface BookmarkBtnProps {
  id: string;
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
  color='white'
}: BookmarkBtnProps) => {
  const openModal = useBookmarkStore((state) => state.openModal);

  return (
    <Tooltip text={propIsBookmarked ? 'Remove bookmark' : 'Add bookmark'}>
      <button
        onClick={() => openModal(id, type)}
      >
        {propIsBookmarked ? (
          <BookmarkCheck className='mx-auto' size={iconSize} color={color} />
        ) : (
          <Bookmark className='mx-auto' size={iconSize} color={color} />
        )}
      </button>
    </Tooltip>
  );
};
// Not sure if this is necessary yet. This will cause multiple subscriptions.
// Subscribe to bookmarks array for reactivity

// const bookmarks = useBookmarkStore(state => state.bookmarks);
// const openModal = useBookmarkStore(state => state.openModal);

// const isBookmarked = useMemo(() => {
//   return bookmarks.some(b => b.id === id && b.type === type);
// }, [bookmarks, id, type]);

// return (
//   <Tooltip text={isBookmarked ? "Remove bookmark" : "Add bookmark"}>
//     <button
//       className="rounded-[50%] cursor-pointer w-[64px] h-[64px] flex items-center bg-white text-black hover:bg-gray-200"
//       onClick={() => openModal(id, type)}
//     >
//       {isBookmarked ? (
//         <BookmarkCheck className="mx-auto" size={iconSize} color="black" />
//       ) : (
//         <Bookmark className="mx-auto" size={iconSize} color="black" />
//       )}
//     </button>
//   </Tooltip>
// );
// };

export default BookmarkBtn;
