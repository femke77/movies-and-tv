import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import dayjs from 'dayjs';
import { get, set, del } from 'idb-keyval';
import { useSyncExternalStore, useEffect } from 'react';

// IndexedDB storage implementation with idb-keyval
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
  // state
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

  // methods
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

  // suspense-related state and methods
  isLoaded: boolean;
  isLoading: boolean;
  loadError: Error | null;
  listeners: Set<() => void>;
  subscribe: (_listener: () => void) => () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initializeStore: () => Promise<any>;
}

export const useStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      // state
      bookmarks: {},
      modalData: null,
      showModal: false,
      previousSearches: [],
      continueWatching: [],

      // suspense-related state
      isLoaded: false,
      isLoading: false,
      loadError: null,
      listeners: new Set<() => void>(),

      // method to subscribe to store changes (for useSyncExternalStore)
      subscribe: (listener) => {
        const { listeners } = get();
        listeners.add(listener);
        return () => listeners.delete(listener);
      },

      // method to initialize the store and handle Suspense
      initializeStore: async () => {
        // If already loaded, return the data immediately
        if (get().isLoaded) {
          return {
            bookmarks: get().bookmarks,
            previousSearches: get().previousSearches,
            continueWatching: get().continueWatching,
          };
        }

        // if currently loading, don't start another load
        if (get().isLoading) {
          // will be caught by suspense
          throw new Promise((resolve) => {
            const unsubscribe = get().subscribe(() => {
              if (get().isLoaded || get().loadError) {
                unsubscribe();
                resolve(get().bookmarks);
              }
            });
          });
        }

        // start loading
        set({ isLoading: true });
        // notify listeners
        get().listeners.forEach((listener) => listener());

        try {
          // persist middleware will handle the actual loading from IndexedDB
          // wait for it to complete, which happens after initialization
          // return the current state which will be populated by the persist middleware

          await new Promise((resolve) => setTimeout(resolve, 0));

          set({ isLoaded: true, isLoading: false });

          // notify listeners
          get().listeners.forEach((listener) => listener());

          return {
            bookmarks: get().bookmarks,
            previousSearches: get().previousSearches,
            continueWatching: get().continueWatching,
          };
        } catch (error) {
          set({
            loadError:
              error instanceof Error ? error : new Error(String(error)),
            isLoading: false,
          });
          throw error;
        }
      },

      // state methods
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
        // always notify listeners of the change (note this on each mutator)
        get().listeners.forEach((listener) => listener());
      },

      clearPreviousSearches: () => {
        set({ previousSearches: [] });
        get().listeners.forEach((listener) => listener());
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

        set((state) => {
          const filtered = state.continueWatching.filter(
            (item) => !(item.id === id && item.media_type === media_type),
          );

          const updated = [...filtered, newItem]
            .sort((a, b) => b.lastUpdated - a.lastUpdated)
            .slice(0, 200);

          return { continueWatching: updated };
        });

        get().listeners.forEach((listener) => listener());
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
        const newItem = {
          id,
          media_type,
          lastUpdated,
          title,
          poster_path,
          release_date,
          runtime,
        };

        set((state) => {
          const filtered = state.continueWatching.filter(
            (item) => !(item.id === id && item.media_type === media_type),
          );

          const updated = [...filtered, newItem]
            .sort((a, b) => b.lastUpdated - a.lastUpdated)
            .slice(0, 200);

          return { continueWatching: updated };
        });

        get().listeners.forEach((listener) => listener());
      },

      removeFromContinueWatching: (id, media_type) => {
        set((state) => {
          const newContinueWatching = state.continueWatching.filter(
            (item) => !(item.id === id && item.media_type === media_type),
          );
          return { continueWatching: newContinueWatching };
        });
        get().listeners.forEach((listener) => listener());
      },

      clearContinueWatching: () => {
        set({ continueWatching: [] });
        get().listeners.forEach((listener) => listener());
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
        get().listeners.forEach((listener) => listener());
      },

      removeBookmark: (id, type) => {
        set((state) => {
          const newBookmarks = { ...state.bookmarks };
          delete newBookmarks[`${id}-${type}`];
          return { bookmarks: newBookmarks };
        });
        get().listeners.forEach((listener) => listener());
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

//hook to use store data with suspense
export function useSuspenseStore<T>(selector: (_state: BookmarkStore) => T): T {
  const store = useStore();

  // if the store isn't loaded yet, initialize it and throw the promise
  if (!store.isLoaded && !store.isLoading) {
    throw store.initializeStore();
  }

  // if the store is currently loading, throw a promise to trigger suspense
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

  // throw error if error while loading
  if (store.loadError) {
    throw store.loadError;
  }

  //  useSyncExternalStore to subscribe to changes
  return useSyncExternalStore(store.subscribe, () => selector(store));
}

// for components that don't need suspense
export function useNonSuspenseStore<T>(
  selector: (_state: BookmarkStore) => T,
): T {
  const store = useStore();

  // still need to initialize the store if needed, but don't throw
  useEffect(() => {
    if (!store.isLoaded && !store.isLoading) {
      store.initializeStore().catch(console.error);
    }
  }, [store]);

  // use useSyncExternalStore to subscribe to changes
  return useSyncExternalStore(store.subscribe, () => selector(store));
}

//useSyncExternalStorage needs subscribe which uses listeners to notify changes.

// rationale for:
// await new Promise((resolve) => setTimeout(resolve, 0));

/*Even though the timeout is set to 0 milliseconds, this actually defers the resolution until after the current event loop iteration completes. It effectively creates a "microtask" that allows other pending operations to finish first.
In the context of the store's initializeStore function, this is giving the persist middleware enough time to load and hydrate the store from IndexedDB before proceeding. The function is waiting for any pending asynchronous operations to complete before marking the store as loaded.

This is a common pattern in JavaScript when you need to ensure that other asynchronous operations have a chance to complete before continuing with execution, especially when dealing with operations that might be scheduled but not yet executed in the event loop.*/
