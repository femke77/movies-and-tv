const Tooltip = ({
  children,
  text,
  mb = 'mb-2',
}: {
  children: React.ReactNode;
  text: string;
  mb?: string;
}) => {
  return (
    <div role='tooltip' id='tooltip-id' className='relative group '>
      {children}
      <div
        className={`transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-md max-w-xs font-bold shadow-lg group-hover:block bg-white text-black  px-3 py-[6px] text-[13px] absolute left-1/2 transform -translate-x-1/2 bottom-full ${mb} w-max rounded
          before:w-4 before:h-4 before:rotate-45 before:bg-white before:absolute before:z-[-1] before:top-5 before:left-1/2 before:-translate-x-1/2 `}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
