
interface UserRatingProps {
    rating: number;
    }


const UserRating = ({ rating }: UserRatingProps) => {
    return (
        <div className="flex items-center mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 "
          viewBox="0 0 36 36"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="white"
            strokeWidth="4"
            fill="none"
            className="opacity-20"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset={100 - (rating / 10) * 100}
            className="transition-all duration-300 ease-out"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
          >
            {rating.toFixed(1)}
          </text>
        </svg>
      </div>
    );
    }
    
    export default UserRating;