import { ChangeEventHandler } from 'react';

function OptionCheckbox(
  {
    id,
    type,
    name,
    value,
    onChange,
  }: {
    id: number,
    type: string,
    name: string,
    value: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>,
  },
) {
  return (
    <>
      <input
        key={`${type}-${id}`}
        id={`${type}-${id}`}
        className="SettingsOption"
        checked={value}
        type="checkbox"
        onChange={onChange}
      />
      <label htmlFor={`${type}-${id}`} className="SettingsLabel">{name}</label>
    </>
  );
}

export default OptionCheckbox;
