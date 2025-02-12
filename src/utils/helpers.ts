export const getStrokeColor = (rating: number) => {
  if (rating >= 7.0 && rating <= 10) return 'green';
  else if (rating >= 5 && rating < 7.0) return 'orange';
  else if (rating === 0) return 'transparent';
  return 'red';
};
