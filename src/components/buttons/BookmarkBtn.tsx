import { Bookmark, BookmarkCheck } from 'lucide-react';
import Tooltip from '../ToolTip';



interface BookmarkBtnProps {
    id: string;
    type: string;
    isBookmarked: boolean;
    onBookmarkClick: (id: string, type: string, isBookmarked: boolean) => void;
    iconSize?: number;
  }
  
  const BookmarkBtn = ({ 
    id, 
    type, 
    isBookmarked,
    onBookmarkClick,
    iconSize = 40
  }: BookmarkBtnProps) => {
    console.log('BookmarkBtn', id, type, isBookmarked);
    
    return (
        <Tooltip text={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}>
      <button className='rounded-[50%]  cursor-pointer w-[64px] h-[64px] flex items-center  bg-white text-black  hover:bg-gray-200'
      value={id} onClick={() => onBookmarkClick(id, type, isBookmarked)}>
        {isBookmarked ? 
          <BookmarkCheck className='mx-auto' size={iconSize} color='black'/> : 
          <Bookmark className='mx-auto' size={iconSize} color='black' />
        }
      </button>
        </Tooltip>)
  };

export default BookmarkBtn;