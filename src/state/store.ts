import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import dayjs from 'dayjs';
import { get, set, del } from 'idb-keyval';
import { useSyncExternalStore } from 'react';

// for components that don't need to trigger suspense, use the useStore hook, ln 85
// if the component needs to trigger suspense, e.g. react query is not involved - comp only uses data from the store - use the useSuspenseStore hook

const CONTINUE_WATCHING_LIMIT = 250;
const SEARCH_HISTORY_LIMIT = 20;
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

interface BingeBoxStore {
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

export const useStore = create<BingeBoxStore>()(
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
        // Return immediately if already loaded
        if (get().isLoaded) {
          return {
            bookmarks: get().bookmarks,
            previousSearches: get().previousSearches,
            continueWatching: get().continueWatching,
          };
        }

        // If already loading, wait for completion
        if (get().isLoading) {
          return new Promise((resolve, reject) => {
            const unsubscribe = get().subscribe(() => {
              if (get().isLoaded) {
                unsubscribe();
                resolve({
                  bookmarks: get().bookmarks,
                  previousSearches: get().previousSearches,
                  continueWatching: get().continueWatching,
                });
              } else if (get().loadError) {
                unsubscribe();
                reject(get().loadError);
              }
            });
          });
        }

        // Start loading process
        set({ isLoading: true });
        get().listeners.forEach((listener) => listener());

        // Return a promise that resolves when loaded
        return new Promise((resolve, reject) => {
          const unsubscribe = get().subscribe(() => {
            if (get().isLoaded) {
              unsubscribe();
              resolve({
                bookmarks: get().bookmarks,
                previousSearches: get().previousSearches,
                continueWatching: get().continueWatching,
              });
            } else if (get().loadError) {
              unsubscribe();
              reject(get().loadError);
            }
          });
        });
      },

      //  methods
      addToPreviousSearches: (query) => {
        const lowerCaseQuery = query.toLocaleLowerCase();
        if (get().previousSearches.includes(lowerCaseQuery)) return;
        set((state) => {
          const newSearches =
            state.previousSearches.length >= SEARCH_HISTORY_LIMIT
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
            .slice(0, CONTINUE_WATCHING_LIMIT);

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
            .slice(0, CONTINUE_WATCHING_LIMIT);

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
        if (!get().isLoaded) return; // user would have to very VERY fast to get here before the store is loaded, but JIC
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
      name:
        process.env.NODE_ENV === 'production'
          ? 'bingebox-idb-storage'
          : 'bingebox-idb-storage-dev',
      storage: idbStorage,
      version: 0,
      merge: (persistedState, currentState) => {
        const persisted = (persistedState as Partial<BingeBoxStore>) || {};

        // If the persisted state has data (not empty objects),
        // prefer it over the initial empty state
        return {
          ...currentState,
          bookmarks:
            persisted.bookmarks && Object.keys(persisted.bookmarks).length > 0
              ? persisted.bookmarks
              : currentState.bookmarks,
          previousSearches:
            persisted.previousSearches && persisted.previousSearches.length > 0
              ? persisted.previousSearches
              : currentState.previousSearches,
          continueWatching:
            persisted.continueWatching && persisted.continueWatching.length > 0
              ? persisted.continueWatching
              : currentState.continueWatching,
        };
      },
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.log('An error occurred during hydration', error);
          useStore.setState({
            isLoaded: true,
            isLoading: false,
            loadError: error as Error,
          });
        } else {
          useStore.setState({
            isLoaded: true,
            isLoading: false,
          });
        }

        // Always trigger listeners to ensure the UI is updated
        useStore.getState().listeners.forEach((listener) => listener());
      },

      migrate: async (persistedState, version) => {
        // handle migration logic here later as needed, this console log should not run
        console.log('Migrating state:', persistedState, version);

        return persistedState as BingeBoxStore;
      },
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        previousSearches: state.previousSearches,
        continueWatching: state.continueWatching,
      }),
    },
  ),
);

//hook to use store data with suspense
export function useSuspenseStore<T>(selector: (_state: BingeBoxStore) => T): T {
  const store = useStore();

  // if not loaded and not loading, start the loading process
  if (!store.isLoaded && !store.isLoading) {
    // This will be caught by React Suspense
    throw store.initializeStore();
  }

  // If currently loading, throw a promise to trigger suspense
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

  // If there was an error, throw it
  if (store.loadError) {
    throw store.loadError;
  }

  // Store is loaded, use it
  return useSyncExternalStore(store.subscribe, () => selector(store));
}

//useSyncExternalStorage needs subscribe which uses listeners to notify changes.

// rationale for:
// await new Promise((resolve) => setTimeout(resolve, 0));

/*Even though the timeout is set to 0 milliseconds, this actually defers the resolution until after the current event loop iteration completes. It effectively creates a "microtask" that allows other pending operations to finish first.
In the context of the store's initializeStore function, this is giving the persist middleware enough time to load and hydrate the store from IndexedDB before proceeding. The function is waiting for any pending asynchronous operations to complete before marking the store as loaded.

This is a common pattern in JavaScript when you need to ensure that other asynchronous operations have a chance to complete before continuing with execution, especially when dealing with operations that might be scheduled but not yet executed in the event loop. -THIS IS REMOVED (it was a hacky guessing game) in favor of an actual nod that hydration has happened thanks to zustand's onRehydratedStorage fn*/

/*There is a race at redeploy between persist middleware setting up a new store and the async hydrating of the store from indexedDb.
Persist middleware doesn't wait for hydration and just sets up a new store with the default values, which are empty. Two solutions, one
was moving state down to the bottom, which got delayed in creation/persitence maybe/probably by task queue, but a more robust solution is the merge method.

--In addition, added hydration flags with onRehydrateStorage should tie everything together.
*/

// try taking out useNonSuspense and just use useStore. if the page is totally reliant on data from the store and you want suspense, then useSuspense
// otherwise useStore.
