import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import dayjs from 'dayjs';

interface BookmarkStore {
  bookmarks: { id: string; type: string }[];
  modalData: { id: string; type: string; isBookmarked: boolean } | null;
  showModal: boolean;
  openModal: (_id: string, _type: string) => void;
  closeModal: () => void;
  addBookmark: (_id: string, _type: string) => void;
  removeBookmark: (_id: string, _type: string) => void;
  isBookmarked: (_id: string, _type: string) => boolean;
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
          bookmarks: [...state.bookmarks, { id, type, dateAdded: dayjs().unix() }],
        })),

      removeBookmark: (id, type) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (b) => !(b.id === id && b.type === type),
          ),
        })),

      isBookmarked: (id, type) =>
        get().bookmarks.some((b) => b.id === id && b.type === type),
    }),
    {
      name: 'bookmark-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bookmarks: state.bookmarks,
      }),
    },
  ),
);

//////////////////////////////////////////////

// TODO refactor: this is the beginning

// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

// interface BookmarkStore {
//   bookmarks: { [key: string]: {_id: string, _type: string} };
//   modalData: { id: string; type: string; isBookmarked: boolean } | null;
//   showModal: boolean;
//   toggleBookmark: (_id: string, _type: string) => void;
//   openModal: (_id: string, _type: string) => void;
//   closeModal: () => void;

//   isBookmarked: (key: string) => boolean;
// }

// export const useBookmarkStore = create<BookmarkStore>()(
//   persist(
//     (set, get) => ({
//       bookmarks: {},
//       modalData: null, // Store the item being bookmarked
//       showModal: false,

//       openModal: (id: string, type: string) => {
//         const key = `${id}-${type}`;
//         set({
//           modalData: {
//             id,
//             type,
//             isBookmarked: get().bookmarks[key] || false,
//           },
//           showModal: true,
//         });
//       },
//       closeModal: () => set({ showModal: false, modalData: null }),

//       toggleBookmark: (id, type) =>
//         set((state) => {
//           const key = `${id}-${type}`;
//           const updated = { ...state.bookmarks };
//           updated[key] ? delete updated[key] : (updated[key] = true);
//           return { bookmarks: updated };
//         }),

//       isBookmarked: (id, type) =>
//         get().bookmarks.some((b) => b.id === id && b.type === type),
//     }),
//     {
//       name: 'bookmark-storage',
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         bookmarks: state.bookmarks,
//       }),
//     },
//   ),
// );
