import React, { FC, ChangeEvent, useCallback, useState } from "react";
import { InputComponentProps } from "./interface";
import "./styles.css";

const InputComponent: FC<InputComponentProps> = ({
  placeholder = "Search...",
  searchKey,
  onInputChange,
}) => {
  const [debouncedValue, setDebouncedValue] = useState(searchKey);

  const debounce = (callback: (value: string) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(value), delay);
    };
  };

  const debouncedOnInputChange = useCallback(
    debounce((value: string) => {
      onInputChange(value);
    }, 300), // 300ms debounce delay
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDebouncedValue(value);
    debouncedOnInputChange(value);
  };

  return (
    <div className="input-container" data-testid="InputComponent">
      <label htmlFor="search-input" className="input-label">
        Search
      </label>
      <input
        data-testid="InputComponent"
        id="search-input"
        type="text"
        value={debouncedValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        className="input"
      />
    </div>
  );
};

export default InputComponent;
