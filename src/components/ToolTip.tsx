const Tooltip = ({ children, text }: {
    children: React.ReactNode;
    text: string;
}) => {
    return (
        <div role="tooltip" id="tooltip-id" className="relative group z-100">
        {children}
        {/* left-1/2 transform -translate-x-1/2 top-full mt-2 */}
        <div
          className="text-md max-w-xs font-semibold shadow-lg hidden group-hover:block bg-white text-black  px-3 py-[6px] text-[13px] absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max rounded 
          before:w-4 before:h-4 before:rotate-45 before:bg-white before:absolute before:z-[-1] before:top-5 before:left-1/2 before:-translate-x-1/2 ">
          {text}
        </div>
      </div>
      
    );
  };
  
  export default Tooltip;