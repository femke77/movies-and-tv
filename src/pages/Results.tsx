import { useSearchTitleQuery } from '../hooks/useSearchAndDiscover';
import { useParams } from 'react-router-dom';
import { IMovie } from '../interfaces/IMovie';
import ItemCard from '../components/ItemCard';
const Results = () => {
  const { query } = useParams<{ query: string }>();
  const { data } = useSearchTitleQuery(query ?? '', '1');
  //   console.log(data, isLoading, error);

  return (
    <div className='mt-20 mx-4 flex flex-wrap gap-4'>
      {data &&
        data?.map((movie: IMovie) => (
          <div key={movie.id}>
            <ItemCard item={movie} itemType='movie' />
          </div>
        ))}
    </div>
  );
};

export default Results;
