import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className="faq-item mb-4">
            <div 
                className="question p-4 bg-gray-800 rounded cursor-pointer flex justify-between items-center"
                onClick={onClick}
            >
                <h3 className="text-xl font-semibold">{question}</h3>
                <span className="text-xl">{isOpen ? '−' : '+'}</span>
            </div>
            {isOpen && (
                <div className="answer p-4 bg-gray-700 rounded-b">
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
            question: "Do I have to pay anything to use your site?",
            answer: "BingeBox is 100% free. We host on a private VPS and operate at a loss in order to get you the best streaming service around. We love to code and build amazing websites and it is our pleasure to have you as a user. "
        },
        
        {
            question: "Do you have a browser recommendation?",
            answer: "BingeBox strongly recommends the Brave browser for safety and to avoid annoying pop-up, click-jack adverts."
        },
        // Add more FAQ items here
    ];

    const handleItemClick = (index: number) => {
        setOpenItemIndex(openItemIndex === index ? null : index);
    };

    return (
        <div className="faq-page text-white p-4 max-w-3xl mx-auto">
            <h1 className="text-center text-4xl mb-8">Frequently Asked Questions</h1>
            <div className="faq-items">
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
}

export default FAQPage;