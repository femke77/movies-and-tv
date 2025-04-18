import { useState } from 'react';
import BackButton from '../components/buttons/BackBtn';
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
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
      answer: 'BingeBox is 100% free. ',
    },
    {
      question: 'What about all these popups & redirects?',
      answer:
        "We aren't putting those on you, they come from the servers we link to that allow you to stream content. To some extent it is understandable that content providers need money coming in, but we can't always be sure that the popups are safe. If you want to block the popups, the recommendations are as follows: 1) If you are on Safari IOS mobile, you can go into settings for Safari, and under advanced options you can find a toggle to verify the window.open function. This will stop everything and some of your taps will appear to do nothing.  2) On Chrome desktop, you can add poper blocker. 3) Firefox + uBlock is a good option. 4) Brave browser will help but on iOS it can't stop all the pop-ups. 4) If you use our site on a laptop/destop with a mouse, you'll note that again, some of your clicks don't do anything, because we are blocking some of the popups ourselves. We just don't have that level of control for many situations.",
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
      <div className='faq-items'>
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
