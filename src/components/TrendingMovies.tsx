import { useTrendingMovies } from '../hooks/useTrendingMovies';
import SlideContainer from './SlideContainer';

const TrendingMovies = () => {
    const { data: movies = [] } = useTrendingMovies();

    return (
        <SlideContainer movies={movies} headerTxt='Trending 🔥' />
    );
};

export default TrendingMovies;
