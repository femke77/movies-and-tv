import { IItem } from '../interfaces/IItem';
import dayjs from 'dayjs';

// Extend Navigator interface to include Brave browser detection
declare global {
  interface Navigator {
    brave?: {
      isBrave?: () => Promise<boolean>;
    };
  }
}

export const getStrokeColor = (rating: number) => {
  if (rating >= 7.0 && rating <= 10) return 'green';
  else if (rating >= 5 && rating < 7.0) return 'orange';
  else if (rating === 0) return 'transparent';
  return 'red';
};

// filter weird/bad data from the TMDB API
export const filterTMDBResults = (results: IItem[]) => {
  return results.filter((item: IItem) => {
    // Ensure the item has either a title.
    const hasValidData = item.title || item.name;
    // Exclude items that have no poster and were released today (some weirdness in the API)
    const isInvalidDueToDate =
      !item.poster_path && dayjs(item.release_date).isSame(dayjs(), 'day');

    return hasValidData && !isInvalidDueToDate;
  });
};

// main page filtering is much stricter due to showcasing items
export const filterMainPageResults = (results: IItem[]) => {
  return results.filter((item: IItem) => {
    const hasValidData = item.title || item.name;
    const isInvalidDueToMissingPosterDateToday =
      (!item.poster_path &&
        item.release_date &&
        dayjs(item.release_date).isSame(dayjs(), 'day')) ||
      (!item.poster_path &&
        item.first_air_date &&
        dayjs(item.first_air_date).isSame(dayjs(), 'day'));
    const validDate = item.release_date || item.first_air_date;

    return (
      hasValidData &&
      !isInvalidDueToMissingPosterDateToday &&
      item.poster_path &&
      validDate
    );
  });
};

// filter out duplicate items from the TMDB API's combined works of a cast member and sort most recent to oldest
export const filterCastResults = (results: IItem[]) => {
  const seen = new Set();
  const uniqueItems = results.filter((item) => {
    const k = `item-${item.id}-${item.media_type}`;
    return seen.has(k) ? false : seen.add(k);
  });
  const itemsWithDates = uniqueItems.map((item) => {
    const dateStr = item.release_date || item.first_air_date || '0000-00-00';
    return {
      item,
      dateObj: dayjs(dateStr),
    };
  });
  return itemsWithDates
    .sort((a, b) => (b.dateObj.isAfter(a.dateObj) ? 1 : -1))
    .map((wrapper) => wrapper.item);
};

export const isIphoneSafari = () => {
  const ua = navigator.userAgent;
  return (
    /iPhone/i.test(ua) && /Safari/i.test(ua) && !/CriOS|FxiOS|OPiOS/i.test(ua)
  );
};

// Extend Navigator interface for userAgentData
declare global {
  interface Navigator {
    userAgentData?: {
      platform: string;
    };
  }
}

export function isIPad(): boolean {
  if (typeof navigator === 'undefined') return false;

  const ua = navigator.userAgent || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;

  // Classic iPad check
  const isOldiPad = /iPad/.test(ua);

  // iPadOS 13+ (reports as Macintosh but with touch)
  const isMac = /Macintosh/.test(ua);
  const isModerniPad = isMac && maxTouchPoints > 1;

  return isOldiPad || isModerniPad;
}

export const isBraveBrowser = async (): Promise<boolean> => {
  return !!(navigator.brave && (await navigator.brave.isBrave?.()));
};
