import { Button } from 'antd';

const ButtonComponent = ({ text, icon, theme = 'primary', disabled = false, className = '', ...props }) => {
  const primaryClass = 'bg-gradient-to-t from-[#FFA600] from-30% via-[#FFD000] to-[#FFD000] text-secondary border-2 border-[#FFCD01] ';
  const secondaryClass = 'bg-[#D31F25] text-[#FFCD01]';
  const tertiaryClass = 'bg-secondary text-primary border-secondary';
  const grayClass = 'bg-gray-100 text-gray-400 border-gray-400';
  const disabledClass = 'opacity-50 cursor-not-allowed';

  const getClassByTheme = () => {
    switch (theme) {
    case 'secondary':
      return secondaryClass;
    case 'tertiary':
      return tertiaryClass;
    case 'gray':
      return grayClass;
    case 'primary':
    default:
      return primaryClass;
    }
  };

  return (
    <div className="relative inline-block w-full ">
      <Button
        disabled={disabled}
        type="danger"
        className={`${getClassByTheme()} ${disabled && disabledClass} rounded-full font-semibold text-lg py-2 px-4 h-14 w-full relative z-10 ${className}`}
        {...props}
      >
        {icon}
        {text && <p className="uppercase">{text}</p>}
      </Button>
      {text &&  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-full rounded-full h-full bg-[#A30005]"></div>}
    </div>
  );
};

export default ButtonComponent;