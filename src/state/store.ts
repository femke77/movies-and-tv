import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import dayjs from 'dayjs';
import { get, set, del } from 'idb-keyval';

// indexeddb is ava on over 98% of broswers so no fallback will be coded at this time
export const idbStorage = {
  getItem: async (name: string) => {
    const value = await get(name);
    return value ?? null;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem: async (name: string, value: any) => {
    await set(name, value);
  },
  removeItem: async (name: string) => {
    await del(name);
  },
};

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
    id: number;
    media_type: string;
    lastUpdated: number;
    title: string;
    season?: number;
    episode?: number;
    poster_path: string;
    release_date?: string;
    runtime?: string;
  }[];

  addToContinueWatchingTv: (
    _id: number,
    _media_type: string,
    _lastUpdated: number,
    _title: string,
    _season: number,
    _episode: number,
    _poster_path: string,
  ) => void;
  addToContinueWatchingMovie: (
    _id: number,
    _media_type: string,
    _lastUpdated: number,
    _title: string,
    _poster_path: string,
    _release_date: string,
    _runtime: string,
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
      continueWatching: [],
      addToContinueWatchingTv: (
        id,
        media_type,
        lastUpdated,
        title,
        season,
        episode,
        poster_path,
      ) => {
        const newItem = {
          id,
          media_type,
          lastUpdated,
          title,
          season,
          episode,
          poster_path,
        };
        const existingItemIndex = get().continueWatching.findIndex(
          (item) => item.id === id && item.media_type === media_type,
        );
        if (existingItemIndex !== -1) {
          // If the item already exists, update it
          const updatedItem = {
            ...get().continueWatching[existingItemIndex],
            lastUpdated,
            season,
            episode,
          };
          set((state) => {
            const newContinueWatching = [...state.continueWatching];
            newContinueWatching[existingItemIndex] = updatedItem;
            return { continueWatching: newContinueWatching };
          });
        } else {
          // If the item doesn't exist, add it to the list
          set((state) => ({
            continueWatching: [newItem, ...state.continueWatching],
          }));
        }
      },
      addToContinueWatchingMovie: (
        id,
        media_type,
        lastUpdated,
        title,
        poster_path,
        release_date,
        runtime,
      ) => {
        if (
          get().continueWatching.some(
            (item) => item.id === id && item.media_type === media_type,
          )
        )
          return;
        const newItem = {
          id,
          media_type,
          lastUpdated,
          title,
          poster_path,
          release_date,
          runtime,
        };
        set((state) => ({
          continueWatching: [newItem, ...state.continueWatching],
        }));
      },
      removeFromContinueWatching: (id, media_type) => {
        set((state) => {
          const newContinueWatching = state.continueWatching.filter(
            (item) => !(item.id === id && item.media_type === media_type),
          );
          return { continueWatching: newContinueWatching };
        });
      },
      clearContinueWatching: () => set({ continueWatching: [] }),
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
      name: 'bingebox-idb-storage',
      storage: idbStorage,
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        previousSearches: state.previousSearches,
        continueWatching: state.continueWatching,
      }),
    },
  ),
);
