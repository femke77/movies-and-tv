const Chip = ({
  label,
  bg = 'bg-white/15',
  fontSize = 'text-sm',
}: {
  label: string;
  bg?: string;
  fontSize?: string;
}) => {
  return (
    <div
      className={`truncate max-w-full leading-6 mr-2 mb-1 text-center rounded-md ${bg} px-2 ${fontSize} text-white shadow-sm w-max h-min`}
    >
      {label}
    </div>
  );
};

export default Chip;
