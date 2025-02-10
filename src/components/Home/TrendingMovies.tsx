import { useTrendingMovies } from '../../hooks/useTrendingMovies';
import SlideContainer from '../SlideContainer';

const TrendingMovies = () => {
    const { data: movies = [] } = useTrendingMovies();

    return (
        <SlideContainer items={movies} type="movie" headerTxt='Trending 🔥' />
    );
};

export default TrendingMovies;
