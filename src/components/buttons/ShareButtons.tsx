import {
  EmailShareButton,
  // FacebookShareButton,
  RedditShareButton,
  // TelegramShareButton,
  // TwitterShareButton,
  WhatsappShareButton,
  // BlueskyShareButton,
} from 'react-share';
import {
  EmailIcon,
  // FacebookIcon,
  RedditIcon,
  // TelegramIcon,
  // TwitterIcon,
  WhatsappIcon,
  // BlueskyIcon,
} from 'react-share';
import { Copy } from 'lucide-react';
import { ToastContainer, Zoom, toast } from 'react-toastify';

const Share = ({ media_type, url }: { media_type: string; url: string }) => {
  return (
    <div className='flex justify-center space-x-4'>
      <EmailShareButton url={url} subject={`Check out this ${media_type}!`}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>

      {/* <FacebookShareButton url={url}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton> */}
      <RedditShareButton url={url} title={`Check out this ${media_type}!`}>
        <RedditIcon size={32} round={true} />
      </RedditShareButton>
      {/* <TelegramShareButton url={url} title={`Check out this ${media_type}!`}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton> */}
      <WhatsappShareButton url={url} title={`Check out this ${media_type}!`}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      {/* <BlueskyShareButton url={url} title={`Check out this ${media_type}!`}>
        <BlueskyIcon size={32} round={true} />
      </BlueskyShareButton> */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!');
        }}
        className='cursor-pointer'
      >
        <Copy color='#ffffff' />
      </button>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Zoom}
      />
    </div>
  );
};
export default Share;
