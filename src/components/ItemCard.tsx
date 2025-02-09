import { IMovie } from "../interfaces/IMovie";
import dayjs from 'dayjs';
const ItemCard = ({ item }: { item: IMovie }) => {
   const formattedDate = dayjs(item.release_date).format('MMM D, YYYY');
  return (
    <div className="flex flex-col items-center justify-center w-42 h-auto bg-white rounded-lg shadow-lg">
      <img
        className="w-42 rounded-t-lg"
        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
        alt={item.title}
      />
      <div className="flex flex-col items-start justify-start w-full h-18 pt-4 bg-black">
        <h2 className="text-sm/6 font-bold">{item.title}</h2>
  <p className="text-xs/6 font-light">{formattedDate}</p>
      </div>
    </div>
  );
}


export default ItemCard;
