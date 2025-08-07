import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  type FocusEvent
} from "react";
import { type CSSProperties } from "styled-components";
import { InputIconContainerH } from "./style";

interface InputIconHProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  type: "contained" | "outlined";
  inputStyle?: CSSProperties;
  containerStyle?: CSSProperties;
}

export const InputIconH = ({
  type,
  endIcon,
  startIcon,
  inputProps,
  setValue,
  value,
  inputStyle,
  containerStyle,
}: InputIconHProps) => {
  const [inputFocused, setInputFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    setInputFocused(true);
    inputProps?.onFocus?.(e);
  }

  const handleBlur = (e:FocusEvent<HTMLInputElement, Element>) => {
    setInputFocused(false);
    inputProps?.onBlur?.(e); 
  }
  return (
    <InputIconContainerH
      style={containerStyle}
      $type={type}
      $startIcon={!!startIcon}
      $endIcon={!!endIcon}
      $inputFocus={inputFocused}
    >
      {startIcon}
      <input
        style={inputStyle}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inputProps}
      />
      {endIcon}
    </InputIconContainerH>
  );
};
