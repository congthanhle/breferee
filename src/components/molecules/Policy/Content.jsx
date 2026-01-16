import { useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/atoms/Button/Icon';
import { FaChevronUp } from 'react-icons/fa';

const PolicyContent = ({ policies, securityTips }) => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="w-full">
      <div className="rounded-lg overflow-hidden dashed-gray-custom py-4">
        <button
          onClick={() => toggleSection('policies')}
          className={clsx(
            'w-full text-left font-semibold text-lg flex justify-between items-center transition-colors',
          )}
        >
          <span>1. Điều khoản</span>
          <Button
            className={clsx(
              'transition-transform duration-300',
              activeSection === 'policies' ? '' : 'rotate-180'
            )}
            icon={<FaChevronUp  size={12}/>}
            variant="text"
          />
        </button>
        {activeSection === 'policies' && (
          <div className="space-y-3 bg-[#FFF8DF] mt-4">
            {policies?.map((policy, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-black mt-1 flex-shrink-0">•</span>
                <p className="text-black text-base leading-relaxed">{policy}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="rounded-lg overflow-hidden w-full py-4">
        <button
          onClick={() => toggleSection('security')}
          className={clsx(
            'w-full text-left font-semibold text-lg flex justify-between items-center transition-colors',
          )}
        >
          <span>2. Chính sách bảo mật</span>
          <Button
            className={clsx(
              'transition-transform duration-300',
              activeSection === 'security' ? '' : 'rotate-180'
            )}
            icon={<FaChevronUp  size={12}/>}
            variant="text"
          />
        </button>
        {activeSection === 'security' && (
          <div className="space-y-3 bg-[#FFF8DF] mt-4">
            {securityTips?.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-black mt-1 flex-shrink-0">•</span>
                <p className="text-black text-base leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyContent;
