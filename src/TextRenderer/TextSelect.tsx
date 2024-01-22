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
  options: string[]
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
          options.map((opt, i) => (
            <li key={`opt-${opt}`}>
              <input
                type="radio"
                id={`opt-${opt}`}
                name="social-account"
                onClick={() => handleOptionClick(i)}
              />
              <label htmlFor={`opt-${opt}`}>{opt}</label>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default TextSelect;
