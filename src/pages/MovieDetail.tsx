import { useEffect, useState } from 'react';
import Chip from '../components/Chip';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { useParams } from 'react-router-dom';
import UserRating from '../components/UserRating';
import WatchButton from '../components/WatchButton';
import { getStrokeColor } from '../utils/helpers';
import { CastList } from '../components/CastList';
import dayjs from 'dayjs';

const MovieDetail = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { movie_id } = useParams<{ movie_id: string }>();
  const { data: movie } = useMovieDetail(movie_id || '');

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  if (!movie) return null;

  const releaseYear = movie?.release_date?.split('-')[0];
  const strokeColor = getStrokeColor(movie.vote_average);
  const directorData = movie?.crew?.find(
    (member: { job: string }) => member.job === 'Director',
  );
  const directorName = directorData?.name || 'Unknown';
  const writerData = movie?.crew?.find(
    (member: { job: string }) =>
      member.job === 'Screenplay' || member.job === 'Writer',
  );
  const writerName = writerData?.name || 'Unknown';
  const calculateROI =
    movie.revenue && movie.budget
      ? (((movie.revenue - movie.budget) / movie.budget) * 100).toFixed(1)
      : '0';
  const ROI =
    calculateROI === 'Infinity' || calculateROI === '-Infinity'
      ? '0'
      : calculateROI;

  return (
    <>
      {movie ? (
        <section id='movie-detail' className='relative flex flex-wrap pt-14  '>
          <div
            className={`fixed inset-0 bg-cover bg-center blur-[5px] z-0 bg-no-repeat transition-opacity 
        duration-1000 
        ease-in-out 
        ${isVisible ? 'opacity-40' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/w342${movie?.backdrop_path}')`,
            }}
          ></div>
          {/* content */}
          <div className='relative z-10 w-full flex flex-wrap '>
            {/* Left Section */}
            <section className='w-[280px] sm:w-[360px] flex-shrink-0 mx-auto md:pl-8'>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
                    : '/no_poster_available.svg'
                }
                alt='movie poster'
                className='w-[360px] h-auto rounded-lg mb-12'
              />
            </section>

            {/* Right Section */}
            <section className='mr-4 flex-grow md:max-h-[525px] basis-full md:basis-1/2 ml-2 pl-6 pr-6 overflow-auto flex flex-col items-center md:items-start  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-700 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 '>
              <h2 className='text-4xl mb-4 font-bold md:pr-16 text-center md:text-left'>
                {movie.title} ({releaseYear})
              </h2>
              <p className='text-center md:text-left italic text-gray-100/50 text-light text-xl mb-3'>
                {movie.tagline}
              </p>
              <div className='flex flex-wrap justify-center space-y-2 mb-4'>
                {movie.genres.map((genre: { id: string; name: string }) => (
                  <Chip key={genre.id} label={genre.name} />
                ))}
              </div>
              <p className='text-lg text-light'>
                Rating:{' '}
                <span className='text-xl text-gray-200/70 my-3 font-bold'>
                  {movie.rating}
                </span>
              </p>
              <div className='flex items-center  mb-4 md:mb-0'>
                <UserRating
                  rating={movie.vote_average}
                  width='w-20'
                  height='h-20'
                  color={strokeColor}
                />
                <div className='pl-6 h-20 sm:pl-8 pt-4'>
                  <WatchButton />
                </div>
              </div>

              <h3 className='text-3xl font-bold mt-4 text-center md:text-left'>Overview</h3>
              {/* put min width 400 if you want the y-axis too */}
              <p className='text-xl text-center md:text-left text-gray-100/50 my-3 mb-6 font-bold'>
                {movie.overview}
              </p>

              <div className='flex flex-wrap md:flex-nowrap space-x-10 mb-4'>
                <p className='text-xl font-bold'>
                  Status:{' '}
                  <span className='text-lg text-gray-100/50 my-3 font-bold'>
                    {movie.status}
                  </span>
                </p>
                <p className='text-xl font-bold'>
                  Release Date:{' '}
                  <span className='text-lg text-gray-100/50 my-3 font-bold'>
                    {dayjs(movie.releaseData).format('MMM DD, YYYY')}
                  </span>
                </p>
                <p className='text-xl font-bold'>
                  Runtime:{' '}
                  <span className='text-lg text-gray-100/50 my-3 font-bold'>
                    {movie.runtime} min
                  </span>
                </p>
              </div>

              <div className='flex flex-wrap md:flex-nowrap md:justify-center space-x-10 mb-4'>
                {movie.budget > 0 && (
                  <p className='text-xl font-bold'>
                    Budget:{' '}
                    <span className='text-lg text-gray-100/50 my-3 font-bold'>
                      {movie.budget.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  </p>
                )}
                <p className='text-xl font-bold'>
                  Revenue:{' '}
                  <span className='text-lg text-gray-100/50 my-3 font-bold'>
                    {movie.revenue.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                </p>
                {ROI !== '0' && (
                  <p className='text-xl font-bold'>
                    ROI:{' '}
                    <span className='text-lg text-gray-100/50 my-3 font-bold'>
                      {ROI}%
                    </span>
                  </p>
                )}
              </div>
              <div className='flex flex-wrap  space-x-10 mb-4'>
              <p className='text-xl font-bold mb-4'>
                Director:{' '}
                <span className='text-lg text-gray-100/50 my-3 font-bold'>
                  {directorName}
                </span>
              </p>
              <p className='text-xl mb-8 font-bold'>
                Writer:{' '}
                <span className='text-lg text-gray-100/50 my-3 font-bold'>
                  {writerName}
                </span>
              </p></div>
            </section>

            {/* Cast Section */}
            <section className='w-full mt-44'>
              <h3 className='text-2xl/14 text-white/70  text-center'>
                Top Cast
              </h3>
              <div className='flex flex-wrap gap-4'>
                <CastList cast={movie.cast} />
              </div>
            </section>
          </div>
        </section>
      ) : (
        <p>No Movie Found 😔</p>
      )}
    </>
  );
};
export default MovieDetail;
