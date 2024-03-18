/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import './TextSelect.css';

function TextSelect({
  activeOption,
  setOptionIndex,
  options,
}: {
  activeOption: string,
  setOptionIndex: Function,
  options: { id: number, label: string }[]
}) {
  const [isActive, setIsActive] = useState(false);

  const handleSelectClick = () => { setIsActive(!isActive); };

  const handleOptionClick = (optionIndex: number) => {
    setOptionIndex(optionIndex);
    setIsActive(!isActive);
  };

  return (
    <div className={isActive ? 'TextSelect Active' : 'TextSelect'}>
      <button
        className="SelectButton"
        type="button"
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="SelectDropdown"
        onClick={() => handleSelectClick()}
      >
        <span className="SelectedValue">{activeOption}</span>
        {/* <span className="arrow" /> */}
      </button>
      <ul
        className="SelectDropdown"
        role="listbox"
      >
        {
          options.map((opt) => (
            <li key={`opt-${opt.id}`}>
              <input
                type="radio"
                id={`opt-${opt.id}-${opt.label}`}
                name="selection-option"
                onClick={() => handleOptionClick(opt.id)}
              />
              <label htmlFor={`opt-${opt.id}-${opt.label}`}>{opt.label}</label>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default TextSelect;
