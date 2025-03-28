import {
  EmailShareButton,
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'react-share';
import { EmailIcon, RedditIcon, TelegramIcon, WhatsappIcon } from 'react-share';
import { Link } from 'lucide-react';
import { ToastContainer, Zoom, toast } from 'react-toastify';

const Share = ({ media_type, url }: { media_type: string; url: string }) => {
  const shareWindowOptions = {
    width: 600,
    height: 400,
  };
  return (
    <div className='flex justify-center space-x-4'>
      <div title={'Share via Email'}>
        <EmailShareButton url={url} subject={`Check out this ${media_type}!`}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </div>

      <div title={'Share via Reddit'}>
        <RedditShareButton
          url={url}
          title={`Check out this ${media_type}!`}
          windowWidth={shareWindowOptions.width}
          windowHeight={shareWindowOptions.height}
        >
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
      </div>
      <div title={'Share via Telegram'}>
        <TelegramShareButton
          url={url}
          title={`Check out this ${media_type}!`}
          windowWidth={shareWindowOptions.width}
          windowHeight={shareWindowOptions.height}
        >
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
      </div>

      <div title={'Share via WhatsApp'}>
        <WhatsappShareButton
          url={url}
          title={`Check out this ${media_type}!`}
          windowWidth={shareWindowOptions.width}
          windowHeight={shareWindowOptions.height}
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>

      <button
        title={'Copy Link'}
        onClick={() => {
          navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!');
        }}
        className='cursor-pointer'
      >
        <Link color='#ffffff' />
      </button>
      <ToastContainer
        position='bottom-left'
        autoClose={2000}
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
