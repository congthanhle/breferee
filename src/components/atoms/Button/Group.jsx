import Button from '@/components/atoms/Button';
import { ButtonLabels } from '@/utils/enums';

const Group = ({ buttons, onButtonClick }) => {
  return (
    <div className="space-y-6 w-full">
      {buttons?.map((buttonId) => {
        if (buttonId === 4 && buttons.length > 1) {
          return (
            <p
              key={buttonId}
              className="text-center text-secondary text-base"
              onClick={() => onButtonClick?.(buttonId)}
            >
              {ButtonLabels[buttonId]}
            </p>
          );
        }
        return (
          <Button
            key={buttonId}
            text={ButtonLabels[buttonId]}
            onClick={() => onButtonClick?.(buttonId)}
          />
        );
      })}
    </div>
  );
};

export default Group;