import Chip from '../components/Chip';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { useParams } from 'react-router-dom';
import UserRating from '../components/UserRating';
import WatchButton from '../components/WatchButton';
import { getStrokeColor } from '../utils/helpers'
import { CastList } from '../components/CastList';

const MovieDetail = () => {

  const { movie_id } = useParams<{ movie_id: string }>();
  const { data: movie } = useMovieDetail(movie_id || '');

  if (!movie) return <p>No Movie Found 😔</p>


  const releaseYear = movie?.release_date?.split('-')[0];
  const strokeColor = getStrokeColor(movie.vote_average);

  return (
    <>
      {movie ? (
        <section id='movie-detail' className='flex flex-wrap my-12 p-2  '>
          {/* Left Section */}
          <section className='w-[390px] flex-shrink-0 mx-auto pl-8'>
            <img
              src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
              alt='movie poster'
              className='w-[390px] h-auto rounded-lg'
            />
          </section>

          {/* Right Section */}
          <section className='flex-grow md:max-h-[525px] basis-full md:basis-1/2 ml-2 pl-6 pr-6 overflow-auto flex flex-col items-center md:items-start  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
            <h2 className='text-4xl font-bold md:pr-16 text-center md:text-left'>
              {movie.title} ({releaseYear})
            </h2>
            <p className='italic text-gray-100/50 text-light text-xl leading-12'>
              {movie.tagline}
            </p>
            <div className='flex leading-10 mb-4'>
              {movie.genres.map((genre: { id: string; name: string }) => (
                <Chip key={genre.id} label={genre.name} />
              ))}
            </div>
            <p className="text-lg text-light">Rating: <span className="text-xl text-gray-200/70 my-3 font-bold">{movie.rating}</span></p>
            <div className='flex items-center'>
              <UserRating
                rating={movie.vote_average}
                width='w-20'
                height='h-20'
                color={strokeColor}
              />
              <div className='h-20 pl-8 pt-4'>
                <WatchButton />
              </div>
            </div>

            <h3 className='text-3xl font-bold mt-4'>Overview</h3>
            {/* put min width 400 if you want the y-axis too */}
            <p className='text-xl text-gray-100/50 my-3 font-bold'>
              {movie.overview}
            </p>
          </section>

          {/* Cast Section */}
          <section className='w-full mt-8'>
            <h3 className='text-2xl/14 text-white/70  text-center'>Top Cast</h3>
            
            <div className='flex flex-wrap gap-4'>
              <CastList cast={movie.cast} />
            </div>
            
          </section>
        </section>
      ) : (
        null
      )}
    </>
  );
};
export default MovieDetail;
