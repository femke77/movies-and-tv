import { Bookmark, BookmarkCheck } from "lucide-react";
import Tooltip from "../ToolTip";
import { useBookmarkStore } from "../../state/store";

interface BookmarkBtnProps {
    id: string;
    type: string;
    isBookmarked?: boolean; 
    iconSize?: number;
  }
  
  const BookmarkBtn = ({ id, type, isBookmarked, iconSize = 40 }: BookmarkBtnProps) => {
    const { openModal, isBookmarked: storeIsBookmarked } = useBookmarkStore((state) => ({
      openModal: state.openModal,
      isBookmarked: state.isBookmarked(id, type),
    }));
  
    //  Use `isBookmarked` from props if available, otherwise fallback to Zustand
    const checkedBookmarkStatus = isBookmarked ?? storeIsBookmarked;
  
    return (
      <Tooltip text={checkedBookmarkStatus ? "Remove bookmark" : "Add bookmark"}>
        <button
          className="rounded-[50%] cursor-pointer w-[64px] h-[64px] flex items-center bg-white text-black hover:bg-gray-200"
          onClick={() => openModal(id, type)}
        >
          {checkedBookmarkStatus ? (
            <BookmarkCheck className="mx-auto" size={iconSize} color="black" />
          ) : (
            <Bookmark className="mx-auto" size={iconSize} color="black" />
          )}
        </button>
      </Tooltip>
    );
  };
  
  export default BookmarkBtn;