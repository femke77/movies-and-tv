import { useCastLookupWithWork } from '../../hooks/useCastLookup';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Carousel from '../../components/containers/CarouselContainer';
import { IItem } from '../../interfaces/IItem';
import BackButton from '../../components/buttons/BackBtn';

const CastMemberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: castData, isLoading } = useCastLookupWithWork(Number(id));
  console.log('castData', castData);
  
  const [lowResImageLoaded, setLowResImageLoaded] = useState(false);
  const [hiResImageLoaded, setHiResImageLoaded] = useState(false);
  const [showBio, setShowBio] = useState(false);
  
  useEffect(() => {
    if (castData && castData.profile_path) {
      const lowResImage = new Image();
      const hiResImage = new Image();
      
      lowResImage.src = `https://image.tmdb.org/t/p/w185${castData.profile_path}`;
      hiResImage.src = `https://image.tmdb.org/t/p/original${castData.profile_path}`;
      
      lowResImage.onload = () => setLowResImageLoaded(true);
      hiResImage.onload = () => setHiResImageLoaded(true);
    }
    return () => {
      setLowResImageLoaded(false);
      setHiResImageLoaded(false);
    };
  }, [castData]);
  
  if (isLoading) return <div>Loading...</div>;
 
  const ImagePlaceHolder = () => (
    <div className='w-full h-full bg-gray-900 absolute inset-0 z-[1]' />
  );

  return (
    <>
      {castData ? (
        <div className='text-white my-24 flex items-center flex-col'>
          <div className='absolute top-20 left-3 z-1'>
            <BackButton />
          </div>
          <div className='fixed inset-0 z-0 bg-gradient-to-r from-black to-neutral-800'></div>
  
          <h1 className='z-1 text-3xl font-semibold mb-6'>{castData.name}</h1>
          
          {/* Image section - conditionally render based on profile_path */}
          {castData.profile_path ? (
            <>
              {/* Placeholder */}
              {(!lowResImageLoaded || !hiResImageLoaded) && (
                <ImagePlaceHolder />
              )}
              {/* Low-res image */}
              <div className='w-50 h-80 relative overflow-hidden rounded-lg'>
                <div className='absolute inset-0 z-[2]'>
                  <img
                    className={`w-full h-full object-cover rounded-b-lg transition-opacity duration-400 ease-in-out ${
                      lowResImageLoaded
                        ? 'opacity-100 blur-0'
                        : 'opacity-0 blur-[10px]'
                    }`}
                    src={`https://image.tmdb.org/t/p/w185${castData.profile_path}`}
                    alt=''
                    onLoad={() => setLowResImageLoaded(true)}
                  />
                </div>
                {/* High-res image */}
                <div className='absolute inset-0 z-[3]'>
                  <img
                    className={`w-full h-full object-cover rounded-b-lg transition-all duration-300 ease-in-out ${
                      hiResImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={`https://image.tmdb.org/t/p/original${castData.profile_path}`}
                    alt={`${castData.name}'s headshot`}
                    onLoad={() => setHiResImageLoaded(true)}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="w-50 h-80 flex items-center justify-center z-5">
              <img src='/no_cast_photo.jpeg' alt={'No image available'} className="w-full h-full object-contain" />
            </div>
          )}
  
          {/* Biography and info section - this now renders regardless of profile_path */}
          <div className='z-1 mx-30 text-center mt-3'>
            {castData.homepage && (
              <Link
                to={castData.homepage}
                target='_blank'
                className='text-blue-500 hover:underline'
              >
                {castData.homepage}
              </Link>
            )}
  
            {castData.birthday && (
              <>
                <p className='text-md mt-3 text-gray-400'>
                  Born: {dayjs(castData.birthday).format('MMM DD, YYYY')}
                </p>
                <p className='text-md text-gray-400'>
                  Age: {dayjs().diff(castData.birthday, 'year')} years
                </p>
              </>
            )}
            
            {castData.place_of_birth && (
              <p className='text-md text-gray-400'>
                Place of Birth: {castData.place_of_birth}
              </p>
            )}
            
            {castData.deathday && (
              <p className='text-md text-gray-400'>
                Died: {dayjs(castData.deathday).format('MMM DD, YYYY')}
              </p>
            )}
            
            {castData.biography && (
              <>
                <h2 className='mt-3 text-gray-300 font-semibold'>Biography</h2>
                <div className='mt-3 mb-19'>
                  <p className='text-md text-gray-400'>
                    {showBio
                      ? castData.biography
                      : `${castData.biography.slice(0, 400)}...`}
                    <button
                      className='text-blue-500 hover:underline ml-1'
                      onClick={() => setShowBio(!showBio)}
                      tabIndex={0}
                    >
                      {showBio ? 'Show Less' : 'Read More'}
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>
          
          <h2 className='text-2xl mb-4'>{castData.name}'s Work</h2>
          {castData.cast && castData.cast.length > 0 && (
            <Carousel items={castData.cast as IItem[]} />
          )}
        </div>
      ) : (
        <p>Nothing Found.</p>
      )}
    </>
  );
};
export default CastMemberDetail;
