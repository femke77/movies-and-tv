export interface ICast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  media_type: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  place_of_birth: string;
  homepage: string;
  known_for_department: string;
  cast?: [
    {
      id: number;
      title?: string;
      release_date?: string;
      first_air_date?: string;
      poster_path: string;
      vote_average: number;
      overview: string;
      media_type: string;
      name?: string;
    },
  ];
}
