const FullscreenBtn = ({ elementId }: { elementId: string }) => {
  const goFullScreen = (element: HTMLElement | null) => {
    if (element) {
      (element as HTMLElement).requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    }
  };

  return (
    <button
      className="w-[52px] pl-3 hover:cursor-pointer"
      onClick={() => goFullScreen(document.getElementById(elementId))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-maximize2"
      >
        <polyline points="15 3 21 3 21 9"></polyline>
        <polyline points="9 21 3 21 3 15"></polyline>
        <line x1="21" x2="14" y1="3" y2="10"></line>
        <line x1="3" x2="10" y1="21" y2="14"></line>
      </svg>
    </button>
  );
};

export default FullscreenBtn;
