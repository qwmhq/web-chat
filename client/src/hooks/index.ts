import React, { useState } from "react";

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
