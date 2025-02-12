import type { ICast } from "../interfaces/ICast";

export const CastCard = ({ cast }: { cast: ICast }) => {
    return (
        <div className='flex flex-col items-center text-center mb-24 '>

            <img
                src={cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                alt={cast.name}
                className='w-36 h-auto rounded-lg'
            />
            <h3 className='text-lg font-semibold mt-4 w-[150px]'>{cast.name}</h3>
            <p className='text-sm w-[150px] text-gray-500'>{cast.character}</p>
        </div>
    );
}