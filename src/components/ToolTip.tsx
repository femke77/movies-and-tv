const Tooltip = ({ children, text }: {
    children: React.ReactNode;
    text: string;
}) => {
    return (
      <div role="tooltip" id="tooltip-id" className="relative group z-100">
        {children}
        <div className="w-[100px] absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bottom-full hidden group-hover:block  text-white text-md rounded py-1 px-2 z-100">
          {text}
        </div>
      </div>
    );
  };
  
  export default Tooltip;