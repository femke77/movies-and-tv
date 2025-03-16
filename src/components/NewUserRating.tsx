interface UserRatingProps {
  rating: number;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: number;
  fill?: string;
}

const UserRating = ({
  rating,
  width = 'w-20',
  height = 'h-20',
  color = "white",
  fontSize = 30,
  fill ='rgba(50,50,50,0.8)',
}: UserRatingProps) => {
  return (
    <div className={`flex items-center mt-4 mr-4`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={`${width} ${height}`}
        viewBox='0 0 37 37'
      >
       
        <text
          x='50%'
          y='50%'
          fontSize={fontSize}
          fontFamily='Anton, sans-serif'
          fill={fill}
          stroke={color}
          strokeWidth='1'
          textAnchor='middle'
          alignmentBaseline='middle'
        >
          {rating === 10  ? rating : rating.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};

export default UserRating;
