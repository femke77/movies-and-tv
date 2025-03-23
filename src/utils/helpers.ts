import { IItem } from '../interfaces/IItem';
import dayjs from 'dayjs';

export const getStrokeColor = (rating: number) => {
  if (rating >= 7.0 && rating <= 10) return 'green';
  else if (rating >= 5 && rating < 7.0) return 'orange';
  else if (rating === 0) return 'transparent';
  return 'red';
};

// filter weird/bad data from the API
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
