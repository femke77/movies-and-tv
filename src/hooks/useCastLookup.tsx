import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { filterCastResults } from '../utils/helpers';

const getCastMemberData = async (id: number) => {
  const { data } = await TMDBClient.get(`/person/${id}`);
  return data || {};
};

const getCastMemberWork = async (id: number) => {
  const { data } = await TMDBClient.get(`/person/${id}/combined_credits`, {});
  return data || [];
};

export const useCastLookupWithWork = (id: number) => {
  return useQuery({
    queryKey: ['cast-member-work', id],
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 25,
    queryFn: async () => {
      if (!id) {
        throw new Error('ID is required');
      }
      const [castMember, castWork] = await Promise.all([
        getCastMemberData(id),
        getCastMemberWork(id),
      ]);
      return {
        ...castMember,
        cast: filterCastResults(castWork.cast),
      };
    },
  });
};
