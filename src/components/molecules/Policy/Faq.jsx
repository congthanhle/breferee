import { useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/atoms/Button/Icon';
import { FaChevronUp } from 'react-icons/fa';
import { faq } from '@/utils/consts/faq';

const Faq = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="w-full space-y-4">
      {faq.map((section, sectionIndex) => (
        <div key={sectionIndex} className="rounded-lg overflow-hidden dashed-gray-custom py-4">
          <button
            onClick={() => toggleSection(sectionIndex)}
            className={clsx(
              'w-full text-left font-semibold text-base flex justify-between items-center transition-colors',
            )}
          >
            <span>{sectionIndex + 1}. {section.title}</span>
            <Button
              className={clsx(
                'transition-transform duration-300',
                activeSection === sectionIndex ? '' : 'rotate-180'
              )}
              icon={<FaChevronUp size={12} />}
              variant="text"
            />
          </button>
          {activeSection === sectionIndex && (
            <div className="space-y-3 bg-[#FFF8DF] mt-2 rounded-lg">
              {section.content.map((item, questionIndex) => (
                <div key={questionIndex} className="border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                  <p className="text-black font-semibold text-base leading-relaxed mb-2">
                    {questionIndex + 1}. {item.question}
                  </p>
                  <div
                    className="text-black text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
