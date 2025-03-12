interface UserRatingProps {
  rating: number;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: number;
}

const UserRating = ({
  rating,
  width = 'w-20',
  height = 'h-20',
  //   color = "white",
  fontSize = 30,
}: UserRatingProps) => {
  return (
    <div className={`flex items-center mt-4 mr-4`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={`${width} ${height}`}
        viewBox='0 0 37 37'
      >
        {/* <circle
          cx='18'
          cy='18'
          r='16'
          stroke='white'
          strokeWidth='1'
          fill='black'
          className='opacity-80'
        /> */}
        {/* <circle
          cx='18'
          cy='18'
          r='16'
          stroke='blue'
          strokeWidth='3'
          fill='black'
          fillOpacity='0.3'
          className='transition-all duration-300 ease-out'
        /> */}
        <text
          x='50%'
          y='50%'
          fontSize={fontSize}
          fontFamily='Impact, sans-serif'
          fill='black'
          stroke='#FFFFFF'
          strokeWidth='0.5'
          textAnchor='middle'
          alignmentBaseline='middle'
        >
          {rating === 10 ? rating: rating.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};

export default UserRating;
