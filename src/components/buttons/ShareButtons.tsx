import {
  EmailShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'react-share';
import { EmailIcon, TelegramIcon, WhatsappIcon } from 'react-share';
import { Link } from 'lucide-react';
import { ToastContainer, Zoom, toast } from 'react-toastify';

const Share = ({ media_type, url }: { media_type: string; url: string }) => {
  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
        fallbackCopyToClipboard(text);
      }
    } else {
      fallbackCopyToClipboard(text);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    try {
      // Create a temporary input element
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        // Use the newer API if available, fallback to the deprecated one if not
        if (window.isSecureContext) {
          navigator.clipboard
            .writeText(text)
            .then(() => toast.success('Link copied to clipboard!'))
            .catch(() => toast.error('Failed to copy link'));
        } else {
          // For older browsers or non-secure contexts
          // still use execCommand but handle it gracefully for now
          document.execCommand('copy');
          toast.success('Link copied to clipboard!');
        }
      } catch {
        toast.error('Failed to copy link');
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Fallback copy failed', err);
      toast.error('Copy failed');
    }
  };
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

      {/* <div title={'Share via Reddit'}>
        <RedditShareButton
          url={url}
          title={`Check out this ${media_type}!`}
          windowWidth={shareWindowOptions.width}
          windowHeight={shareWindowOptions.height}
        >
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
      </div> */}
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
        title='Copy Link to Clipboard'
        onClick={() => copyToClipboard(url)}
        className='cursor-pointer bg-transparent border-none text-white flex items-center space-x-1'
      >
        <Link />
      </button>
      <ToastContainer
        position='bottom-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Zoom}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};
export default Share;
