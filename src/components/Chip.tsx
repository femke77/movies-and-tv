const Chip = ({
  label,
  bg = 'bg-white/15',
}: {
  label: string;
  bg?: string;
}) => {
  return (
    <div
      className={`leading-6 mr-2 mb-1 text-center rounded-md ${bg}  px-2  text-sm text-white shadow-sm w-max h-min`}
    >
      {label}
    </div>
  );
};

export default Chip;
