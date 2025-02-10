import { useTopRatedMovies } from '../../hooks/useTopRated';
import SlideContainer from '../SlideContainer';

const TopRatedMovies = () => {
    const { data: movies = [] } = useTopRatedMovies();

    return (
        <div className="mt-24">
            <SlideContainer items={movies} type="movie" headerTxt='Top Rated 🔝' />
        </div>
    );
};

export default TopRatedMovies;
