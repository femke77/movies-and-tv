import { useState } from 'react';
import BackButton from '../components/buttons/BackBtn';
import useDocumentTitle from '../hooks/usePageTitles';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  useDocumentTitle('FAQ | BingeBox');
  return (
    <div className='faq-item mb-4'>
      <div className='absolute top-20 left-3 z-1'>
        <BackButton />
      </div>
      <div
        className='question p-4 bg-gray-800 rounded cursor-pointer flex justify-between items-center'
        onClick={onClick}
      >
        <h3 className='text-xl font-semibold'>{question}</h3>
        <span className='text-xl'>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div className='answer p-4 bg-gray-700 rounded-b'>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: 'Do I have to pay anything to use your site?',
      answer:
        'BingeBox is 100% free. We may start accepting donations in the future, strictly for your appreciation of the site, not the content.',
    },
    {
      question: 'What is up with all these popups & redirects?',
      answer:
        "We aren't subjecting you to those! They come from the servers we link to that allow you to stream content. To some extent it is understandable that content providers need money coming in, but we can't always be sure that the popups are safe or appropriate. BingeBox takes issue with porn and spy/malware, of course, and we will work hard to keep you safe from that wherever possible.  However, it's up to you to take steps as well. If you want to block the popups & redirects, the recommendations are as follows: \n\n 1) If you are on Safari IOS mobile, you can go into settings for Safari, and under advanced options, then feature flags, you can find a toggle to verify the window.open function. This will stop almost everything (100% all redirects/popups on SOME servers) and some of your taps will appear to do nothing. This approach may interfere with normal browsing on other websites. \n\n 2) On Chrome or Firefox desktop, you can add Poper Blocker. This will provide a small popup at the top of the page asking if you want to allow the redirect or not. \n\n 3) For Android, we think Firefox + uBlock is a good option. \n\n 4) Brave browser is another option in \"Shields Up\" mode but on iOS it can't stop all the pop-ups & redirects and isn't nearly as good as #1. \n\n 5) Bingebox devs have created safer servers so try using those. Safe server 1 is the safest. Safe server 2 and 3 are working well now but are being monitored for the addition of redirects. Currently none of the safe servers require incognito/private browsing but you may switch to that if needed or desired. \n\n 6) If you are on a desktop/laptop using a mouse, there is an ad/redirect blocking feature that we are implementing soon. Again it will cause some of your clicks to do nothing, and it is not guareteed to work 100% but should reduce the amount significantly. Stand by for this option! \n\n\n BingeBox is not responsible for problems incurred by third party servers. Use of the site is at your own risk. ",
    },
    {
      question:
        'Is this site illegal for me to use? Will my ISP know I am using it?',
      answer:
        'Your ISP will only know that you are watching videos, not what the videos are or whether you paid for them or not. Your ISP will see it as similar to YouTube. BingeBox uses servers with DMCA protected links and we do not engage in any copyright infrigement. We recommend that you use a VPN if you are concerned about your privacy. ',
    },
    {
      question: "Sometimes I can't find what I am looking for, what do I do?",
      answer:
        "BingeBox is not responsible for the content of the servers we link to, therefore we can't help you if you don't find something you are looking for. However, this is often a temporary problem and we encourage you to check back later. We provide multiple servers including multi-server embeds, so please make sure you are checking all possible resources. Look for a cloud icon, a gearbox icon, or a dropdown menu to see additional servers not listed in the main list.",
    },
    // {
    //     question: "",
    //     answer: " "
    // },
    // {
    //     question: "",
    //     answer: " "
    // },
    // {
    //     question: "",
    //     answer: " "
    // },
  ];

  const handleItemClick = (index: number) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  return (
    <div className='faq-page text-white p-4 max-w-3xl mx-auto mt-20'>
      <h1 className='text-center text-4xl mb-8'>Frequently Asked Questions</h1>
      <div className='faq-items whitespace-pre-wrap'>
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openItemIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
