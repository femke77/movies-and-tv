import type { ICast } from '../interfaces/ICast';
import { CastCard } from './CastCard';
import SimpleSlider from './SimpleCarousel';

export const CastList = ({ cast }: { cast: ICast[] }) => {
  return (
    <SimpleSlider>
      {cast.map((actor) => (
        <div
          key={`${actor.id}-${actor.character}`}
          onMouseDown={(e) => e.preventDefault()}
        >
          <CastCard cast={actor} />
        </div>
      ))}
    </SimpleSlider>
  );
};
