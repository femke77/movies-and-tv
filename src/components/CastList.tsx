import type { ICast } from '../interfaces/ICast';
import { CastCard } from './CastCard';
import SimpleSlider from './SlideSimple';

export const CastList = ({ cast }: { cast: ICast[] }) => {
  return (
    <SimpleSlider>
      {cast.map((actor) => (
        <div key={actor.id} onMouseDown={(e) => e.preventDefault()}>
          <CastCard cast={actor} />
        </div>
      ))}
    </SimpleSlider>
  );
};
