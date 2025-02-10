interface UserRatingProps {
  rating: number;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: number;
}

const UserRating = ({
  rating,
  width = 'w-16',
  height = 'h-16',
  color = 'white',
  fontSize = 10,
}: UserRatingProps) => {
  return (
    <div className='flex items-center mt-4'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={`${width} ${height}`}
        viewBox='0 0 36 36'
      >
        <circle
          cx='18'
          cy='18'
          r='16'
          stroke='white'
          strokeWidth='4'
          fill='black'
          className='opacity-40'
        />
        <circle
          cx='18'
          cy='18'
          r='16'
          stroke={color}
          strokeWidth='3'
          fill='black'
          fillOpacity='0.2'
          strokeDasharray='100'
          strokeDashoffset={100 - (rating / 10) * 100}
          className='transition-all duration-300 ease-out'
        />
        <text
          x='50%'
          y='50%'
          textAnchor='middle'
          alignmentBaseline='middle'
          fill='white'
          fontSize={fontSize}
          fontWeight='bold'
        >
          {rating.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};

export default UserRating;
