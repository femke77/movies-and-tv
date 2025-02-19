const Chip = ({ label }: { label: string }) => {
  return (
    <div className='leading-6 mr-2 text-center rounded-md  bg-black/40 px-2  text-sm text-white shadow-sm w-max h-min'>
      {label}
    </div>
  );
};

export default Chip;
