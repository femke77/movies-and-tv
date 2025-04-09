import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import dayjs from 'dayjs';

interface BookmarkStore {
  bookmarks: { [key: string]: { id: string; type: string; dateAdded: number } };
  modalData: { id: string; type: string; isBookmarked: boolean } | null;
  showModal: boolean;
  openModal: (_id: string, _type: string) => void;
  closeModal: () => void;
  addBookmark: (_id: string, _type: string) => void;
  removeBookmark: (_id: string, _type: string) => void;
  isBookmarked: (_id: string, _type: string) => boolean;
  previousSearches: string[];
  addToPreviousSearches: (_query: string) => void;
  clearPreviousSearches: () => void;
  continueWatching: {
    [key: string]: {
      id: number;
      media_type: string;
      lastUpdated: number;
      title: string;
      season?: number;
      episode?: number;
      poster_path: string;
      release_date?: string;
      runtime?: string;
    };
  };
  addToContinueWatchingTv: (
    _id: number,
    _media_type: string,
    _lastUpdated: number,
    _title: string,
    _season: number,
    _episode: number,
    _poster_path: string
  ) => void;
  addToContinueWatchingMovie: (
    _id: number,
    _media_type: string,
    _lastUpdated: number,
    _title: string,
    _poster_path: string,
    _release_date: string,
    _runtime: string
  ) => void;
  removeFromContinueWatching: (_id: number, _media_type: string) => void;
  clearContinueWatching: () => void;
}

export const useStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: {},
      modalData: null, // Store the data of the item toggling bookmark state
      showModal: false,
      previousSearches: [],
      addToPreviousSearches: (query) => {
        const lowerCaseQuery = query.toLocaleLowerCase();
        if (get().previousSearches.includes(lowerCaseQuery)) return;
        set((state) => {
          // Create new array either with just the newest items (if at limit)
          // or with all previous items plus the new one. Rotates the array.
          const newSearches =
            state.previousSearches.length >= 20
              ? [...state.previousSearches.slice(1), lowerCaseQuery] // Remove oldest item
              : [...state.previousSearches, lowerCaseQuery]; // Simply add

          return { previousSearches: newSearches };
        });
      },
      clearPreviousSearches: () => set({ previousSearches: [] }),
      continueWatching: {},
      addToContinueWatchingTv: (
        id,
        media_type,
        lastUpdated,
        title,
        season,
        episode,
        poster_path
      ) => {
        set((state) => ({
          continueWatching: {
            ...state.continueWatching,
            [`${id}-${media_type}`]: {
              lastUpdated,
              title,
              season,
              episode,
              media_type,
              id,
              poster_path,
            },
          },
        }));
      },
      addToContinueWatchingMovie: (
        id,
        media_type,
        lastUpdated,
        title,
        poster_path,
        release_date,
        runtime
      ) => {
        set((state) => ({
          continueWatching: {
            ...state.continueWatching,
            [`${id}-${media_type}`]: {
              lastUpdated,
              title,
              media_type,
              id,
              poster_path,
              release_date,
              runtime,
            },
          },
        }));
      },
      removeFromContinueWatching: (id, media_type) => {
        set((state) => {
          const newContinueWatching = { ...state.continueWatching };
          delete newContinueWatching[`${id}-${media_type}`];
          return { continueWatching: newContinueWatching };
        });
      },
      clearContinueWatching: () => set({ continueWatching: {} }),
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
          bookmarks: {
            ...state.bookmarks,
            [`${id}-${type}`]: {
              id: id,
              type: type,
              dateAdded: dayjs().unix(),
            },
          },
        })),

      removeBookmark: (id, type) =>
        set((state) => {
          const newBookmarks = { ...state.bookmarks };
          delete newBookmarks[`${id}-${type}`];
          return { bookmarks: newBookmarks };
        }),
      isBookmarked: (id, type) =>
        get().bookmarks[`${id}-${type}`] !== undefined,
    }),
    {
      name: 'bingebox-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        previousSearches: state.previousSearches,
        continueWatching: state.continueWatching,
      }),
    }
  )
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
