const Tooltip = ({ children, text }: {
    children: React.ReactNode;
    text: string;
}) => {
    return (
        <div role="tooltip" id="tooltip-id" className="relative group z-100">
        {children}
        <div
          className="text-md max-w-xs absolute shadow-lg hidden group-hover:block bg-black text-white font-semibold px-3 py-[6px] text-[13px] left-full ml-4 top-1/2 -translate-y-1/2 w-max rounded 
          before:w-4 before:h-4 before:rotate-45 before:bg-black before:absolute before:z-[-1] before:top-1/2 before:-left-2 before:-translate-y-1/2 before:ml-1">
          {text}
        </div>
      </div>
      
    );
  };
  
  export default Tooltip;