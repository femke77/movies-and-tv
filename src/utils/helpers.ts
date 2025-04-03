import { IItem } from '../interfaces/IItem';
import dayjs from 'dayjs';

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

// main page filtering is much stricter
export const filterMainPageResults = (results: IItem[]) => {
  return results.filter((item: IItem) => {
    const hasValidData = item.title || item.name;
    const isInvalidDueToDate =
      (item.release_date && dayjs(item.release_date).isSame(dayjs(), 'day')) ||
      (item.first_air_date &&
        dayjs(item.first_air_date).isSame(dayjs(), 'day'));
    const isValidVoteAverage = item.vote_average && item.vote_average > 0;
    const validDate = item.release_date || item.first_air_date;
    return (
      hasValidData &&
      !isInvalidDueToDate &&
      item.poster_path &&
      isValidVoteAverage &&
      validDate
    );
  });
};

// filter out duplicate items from the TMDB API's combined works of a cast member
export const filterCastResults = (results: IItem[]) => {
  const seen = new Set();
  return results.filter((item) => {
    const k = `item-${item.id}-${item.media_type}`;
    return seen.has(k) ? false : seen.add(k);
  });
};

export const isIphoneSafari = () => {
  const ua = navigator.userAgent;
  return (
    /iPhone/i.test(ua) && /Safari/i.test(ua) && !/CriOS|FxiOS|OPiOS/i.test(ua)
  );
};

export const isIPad = () => {
  return (
    /iPad/.test(navigator.userAgent) ||
    (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1)
  );
};
