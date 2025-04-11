const Chip = ({
  label,
  bg = 'bg-white/15',
  fontSize = 'text-sm',
  textColor = 'text-white',
}: {
  label: string;
  bg?: string;
  fontSize?: string;
  textColor?: string;
}) => {
  return (
    <div
      className={`truncate max-w-full leading-6 mr-2  text-center rounded-md ${bg} px-2 ${fontSize} ${textColor} shadow-sm w-max h-min`}
    >
      {label}
    </div>
  );
};

export default Chip;
