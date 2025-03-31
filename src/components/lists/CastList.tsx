import type { ICast } from '../../interfaces/ICast';
import { CastCard } from '../cards/CastCard';
import SimpleCarousel from '../containers/SimpleCarousel';

export const CastList = ({ cast }: { cast: ICast[] }) => {
  return (
    <SimpleCarousel>
      {cast.map((actor) => (
        <div
          key={`${actor.id}-${actor.character}`}
          onMouseDown={(e) => e.preventDefault()}
        >
          <CastCard cast={actor} />
        </div>
      ))}
    </SimpleCarousel>
  );
};
