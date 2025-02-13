import { useSearchTitleQuery } from '../hooks/useSearchAndDiscover';
import { useParams } from 'react-router-dom';
import { IMovie } from '../interfaces/IMovie';

const Results = () => {
  const { query } = useParams<{ query: string }>();
  const { data } = useSearchTitleQuery(query ?? '', '1');
  //   console.log(data, isLoading, error);

  return (
    <div className='mt-30'>
      {data &&
        data?.map((movie: IMovie) => (
          <div key={movie.id}>
            <h1>{movie.title}</h1>
          </div>
        ))}
    </div>
  );
};

export default Results;
