import type { ICast } from '../../interfaces/ICast';
import { CastCard } from '../cards/CastCard';
import SimpleCarousel from '../containers/SimpleCarousel';
import { isSmartTvBrowser } from '../../utils/helpers';

export const CastList = ({ cast }: { cast: ICast[] }) => {
  const isTvBrowser = isSmartTvBrowser();

  return (
    <SimpleCarousel>
      {cast.map((actor) => (
        <div
          key={`${actor.id}-${actor.character}`}
          onMouseDown={(e) => e.preventDefault()}
          className={isTvBrowser ? 'shrink-0 px-2' : undefined}
        >
          <CastCard cast={actor} cardWidth='w-42' />
        </div>
      ))}
    </SimpleCarousel>
  );
};
