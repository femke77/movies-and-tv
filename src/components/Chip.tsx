const Chip = ({ label }: { label: string }) => {
  return (
    <div className='leading-6 mr-2 text-center rounded-md  bg-white/15 px-2  text-md text-white shadow-sm w-max h-min'>
      {label}
    </div>
  );
};

export default Chip;
