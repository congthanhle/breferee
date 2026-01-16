const Icon = ({ icon, className = '', ...props }) => {
  return (
    <div
      className={`bg-gradient-to-t from-[#FFA600] from-30% via-[#FFD000] to-[#FFD000] text-secondary p-2 items-center justify-center rounded-full flex ${className}`}
      {...props}
    >
      {icon}
    </div>
  );
};

export default Icon;