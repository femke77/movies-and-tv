import { IMovie } from "../interfaces/IMovie";

const ItemCard = ({ item }: { item: IMovie }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-cover bg-center w-48 h-72 bg-white rounded-lg shadow-lg"
    style={{
      backgroundImage: `url('https://image.tmdb.org/t/p/original${item.poster_path}')`,
    }}
    >
     
      <div className="flex flex-col items-center justify-center w-full h-1/4 p-4">
        <h1 className="text-lg font-bold">{item.title}</h1>
        {/* <p className="text-sm text-center">{item.overview}</p> */}
      </div>
    </div>
  );
}


export default ItemCard;
