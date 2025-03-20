import { useBookmarkStore } from "../state/store";
import { useState, useEffect } from "react";
import { ItemCard } from "../components/ItemCard";
import { IItem } from "../interfaces/IItem";
import { TMDBClient } from "../utils/axiosConfig";

function useBookmarksDetails() {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const [movieDetails, setMovieDetails] = useState<IItem[]>([]);
  const [tvDetails, setTvDetails] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    const fetchItemDetails = async (type: string, id: string) => {
      try {
        const response = await TMDBClient.get(`/${type}/${id}`);  
        if (response.status !== 200) throw new Error('Failed to fetch');
        return response.data;
      } catch (error) {
        console.error(`Error fetching ${type} ${id}:`, error);
        return null;
      }
    };

    const movieBookmarks = bookmarks.filter(b => b.type === 'movie');
    const tvBookmarks = bookmarks.filter(b => b.type === 'tv');
    
    Promise.all(movieBookmarks.map(movie => fetchItemDetails('movie', movie.id)))
      .then(results => {
        setMovieDetails(results.filter(Boolean));
      });
    
    Promise.all(tvBookmarks.map(tv => fetchItemDetails('tv', tv.id)))
      .then(results => {
        setTvDetails(results.filter(Boolean));
        setIsLoading(false);
      });
  }, [bookmarks]); 

  return { movieDetails, tvDetails, isLoading };
}

const SavedItems = () => {

  const { movieDetails, tvDetails, isLoading } = useBookmarksDetails();

  if (isLoading) {
    return <div className="mt-24 text-white text-center">Loading your bookmarks...</div>;
  }

  return (
    <div className='mt-24 text-white'>
      <h1 className="text-4xl text-center mx-3 mb-3">Your Bookmarked Movies & Shows</h1>
      
      <h2 className="text-3xl mr-3 mb-3">Saved Movies</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {movieDetails.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            itemType='movie' 
            isBookmarked={true} 
          />
        ))}
      </div>
      
      <h2 className="text-3xl mr-3 mb-3">Saved TV Shows</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {tvDetails.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            itemType='tv' 
            isBookmarked={true} 
          />
        ))}
      </div>
    </div>
  );
};

export default SavedItems;