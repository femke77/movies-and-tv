import { usePopularMovies } from '../../hooks/usePopularMovies';

import SlideContainer from '../SlideContainer';

const PopularMovies = () => {
    const { data: movies = [] } = usePopularMovies();

    return (
        <div className="mt-24">
            <SlideContainer items={movies} type="movies" headerTxt='Popular 📈' />
        </div>
    );
};

export default PopularMovies;
