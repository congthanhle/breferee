const icons = import.meta.glob('/src/assets/icons/*', { eager: true });
const Icon = ({ name, size = 24, type = 'svg', ...props }) => {
  const file = icons[`/src/assets/icons/${name}.${type}`];
  if (!file) return null;
  return (
    <img
      src={iconPath}
      alt={name}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      {...props}
    />
  );
};

export default Icon;