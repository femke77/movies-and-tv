
import { useCastLookupWithWork } from '../hooks/useCastLookup';
import { useParams } from 'react-router-dom';

const CastMemberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: castData } = useCastLookupWithWork(Number(id));
  if (!castData) {
    return (
      <div className='container'>
        <h1>Not Found</h1>
      </div>
    );
  }
  console.log(castData);
  return (
    <div className='text-white mt-40'>
      <h1>Cast Member Detail</h1>
      <p>Details about the cast member will be displayed here.</p>
    </div>
  );
};
export default CastMemberDetail;
