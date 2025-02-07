import React, { useEffect, useState } from "react";

export const useField = (
  type: React.HTMLInputTypeAttribute,
): [
  {
    type: React.HTMLInputTypeAttribute;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  },
  () => void,
] => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [{ type, value, onChange }, reset];
};

export const useDebounce = <T>(value: T, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
