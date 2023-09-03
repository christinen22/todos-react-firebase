interface CheckboxHandlerProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const CheckboxHandler: React.FC<CheckboxHandlerProps> = ({
  isChecked,
  onChange,
}) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default CheckboxHandler;
