import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BookmarkStore {
  bookmarks: { id: string; type: string }[];
  modalData: { id: string; type: string; isBookmarked: boolean } | null;
  showModal: boolean;
  openModal: (id: string, type: string) => void;
  closeModal: () => void;
  addBookmark: (id: string, type: string) => void;
  removeBookmark: (id: string, type: string) => void;
  isBookmarked: (id: string, type: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
    persist(
      (set, get) => ({
        bookmarks: [],
        modalData: null, // Store the item being bookmarked
        showModal: false, 
  
        openModal: (id: string, type: string) => {
          set({
            modalData: {
              id,
              type,
              isBookmarked: get().isBookmarked(id, type),
            },
            showModal: true,
          });
        },
        closeModal: () => set({ showModal: false, modalData: null }),
  
        addBookmark: (id, type) =>
          set((state) => ({
            bookmarks: [...state.bookmarks, { id, type }],
          })),
  
        removeBookmark: (id, type) =>
          set((state) => ({
            bookmarks: state.bookmarks.filter(
              (b) => !(b.id === id && b.type === type)
            ),
          })),
  
        isBookmarked: (id, type) =>
          get().bookmarks.some((b) => b.id === id && b.type === type),
      }),
      {
        name: "bookmark-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          bookmarks: state.bookmarks,
        }),
      }
    )
  );