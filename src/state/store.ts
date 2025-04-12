import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import dayjs from 'dayjs';
import { get, set, del } from 'idb-keyval';
import React, { useSyncExternalStore } from 'react';

// IndexedDB storage implementation
export const idbStorage = {
  getItem: async (name: string) => {
    const value = await get(name);
    return value ?? null;
  },
  setItem: async (name: string, value: any) => {
    await set(name, value);
  },
  removeItem: async (name: string) => {
    await del(name);
  },
};

interface BookmarkStore {
  // Existing state
  bookmarks: { [key: string]: { id: string; type: string; dateAdded: number } };
  modalData: { id: string; type: string; isBookmarked: boolean } | null;
  showModal: boolean;
  previousSearches: string[];
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


  openModal: (_id: string, _type: string) => void;
  closeModal: () => void;
  addBookmark: (_id: string, _type: string) => void;
  removeBookmark: (_id: string, _type: string) => void;
  isBookmarked: (_id: string, _type: string) => boolean;
  addToPreviousSearches: (_query: string) => void;
  clearPreviousSearches: () => void;
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

  // New Suspense-related state and methods
  isLoaded: boolean;
  isLoading: boolean;
  loadError: Error | null;
  listeners: Set<() => void>;
  subscribe: (listener: () => void) => () => void;
  initializeStore: () => Promise<any>;
}

export const useStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      // Existing state
      bookmarks: {},
      modalData: null,
      showModal: false,
      previousSearches: [],
      continueWatching: [],

      // New Suspense-related state
      isLoaded: false,
      isLoading: false,
      loadError: null,
      listeners: new Set<() => void>(),

      // Method to subscribe to store changes (for useSyncExternalStore)
      subscribe: (listener) => {
        const { listeners } = get();
        listeners.add(listener);
        return () => listeners.delete(listener);
      },

      // Method to initialize the store and handle Suspense
      initializeStore: async () => {
        // If already loaded, return the data immediately
        if (get().isLoaded) {
          return {
            bookmarks: get().bookmarks,
            previousSearches: get().previousSearches,
            continueWatching: get().continueWatching
          };
        }

        // If currently loading, don't start another load
        if (get().isLoading) {
          // This will be caught by Suspense
          throw new Promise((resolve) => {
            const unsubscribe = get().subscribe(() => {
              if (get().isLoaded || get().loadError) {
                unsubscribe();
                resolve(get().bookmarks);
              }
            });
          });
        }

        // Start loading
        set({ isLoading: true });

        try {
          // The persist middleware will handle the actual loading from IndexedDB
          // We just need to wait for it to complete, which happens after initialization
          // Return the current state which will be populated by the persist middleware
          await new Promise(resolve => setTimeout(resolve, 0));
          
          set({ isLoaded: true, isLoading: false });
          
          // Notify listeners
          get().listeners.forEach(listener => listener());
          
          return {
            bookmarks: get().bookmarks,
            previousSearches: get().previousSearches,
            continueWatching: get().continueWatching
          };
        } catch (error) {
          set({ 
            loadError: error instanceof Error ? error : new Error(String(error)),
            isLoading: false 
          });
          throw error;
        }
      },

      // Existing methods
      addToPreviousSearches: (query) => {
        const lowerCaseQuery = query.toLocaleLowerCase();
        if (get().previousSearches.includes(lowerCaseQuery)) return;
        set((state) => {
          const newSearches =
            state.previousSearches.length >= 20
              ? [...state.previousSearches.slice(1), lowerCaseQuery]
              : [...state.previousSearches, lowerCaseQuery];

          return { previousSearches: newSearches };
        });
        // Notify listeners of the change
        get().listeners.forEach(listener => listener());
      },
      
      clearPreviousSearches: () => {
        set({ previousSearches: [] });
        get().listeners.forEach(listener => listener());
      },
      
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
          set((state) => ({
            continueWatching: [newItem, ...state.continueWatching],
          }));
        }
        get().listeners.forEach(listener => listener());
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
        get().listeners.forEach(listener => listener());
      },
      
      removeFromContinueWatching: (id, media_type) => {
        set((state) => {
          const newContinueWatching = state.continueWatching.filter(
            (item) => !(item.id === id && item.media_type === media_type),
          );
          return { continueWatching: newContinueWatching };
        });
        get().listeners.forEach(listener => listener());
      },
      
      clearContinueWatching: () => {
        set({ continueWatching: [] });
        get().listeners.forEach(listener => listener());
      },
      
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

      addBookmark: (id, type) => {
        set((state) => ({
          bookmarks: {
            ...state.bookmarks,
            [`${id}-${type}`]: {
              id: id,
              type: type,
              dateAdded: dayjs().unix(),
            },
          },
        }));
        get().listeners.forEach(listener => listener());
      },

      removeBookmark: (id, type) => {
        set((state) => {
          const newBookmarks = { ...state.bookmarks };
          delete newBookmarks[`${id}-${type}`];
          return { bookmarks: newBookmarks };
        });
        get().listeners.forEach(listener => listener());
      },
      
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

// Custom hook to use store data with Suspense
export function useSuspenseStore<T>(selector: (state: BookmarkStore) => T): T {
  const store = useStore();
  
  // If the store isn't loaded yet, initialize it and throw the promise
  if (!store.isLoaded && !store.isLoading) {
    throw store.initializeStore();
  }
  
  // If the store is currently loading, throw a promise to trigger Suspense
  if (store.isLoading) {
    throw new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        if (store.isLoaded || store.loadError) {
          unsubscribe();
          resolve(null);
        }
      });
    });
  }
  
  // If there was an error loading the store, throw it
  if (store.loadError) {
    throw store.loadError;
  }
  
  // Use useSyncExternalStore to subscribe to changes
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store)
  );
}

// Helper hook for components that don't need Suspense
export function useNonSuspenseStore<T>(selector: (state: BookmarkStore) => T): T {
  const store = useStore();
  
  // Initialize the store if needed, but don't throw
  React.useEffect(() => {
    if (!store.isLoaded && !store.isLoading) {
      store.initializeStore().catch(console.error);
    }
  }, [store]);
  
  // Use useSyncExternalStore to subscribe to changes
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store)
  );
}