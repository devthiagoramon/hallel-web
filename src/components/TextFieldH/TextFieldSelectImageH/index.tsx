import SelectImageH from "@/components/SelectImageH";
import  type { Dispatch, HTMLProps, SetStateAction } from "react";
import { type CSSProperties } from "styled-components";
import { TextFieldHContainer } from "../style";

interface TextFieldSelectImageHProps {
  label: string;
  inputProps?: HTMLProps<HTMLInputElement>;
  labelStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  setValue: Dispatch<SetStateAction<File | null>>;
}

const TextFieldSelectImageH = ({
  label,
  inputProps,
  labelStyle,
  inputStyle,
  setValue,
}: TextFieldSelectImageHProps) => {
  return (
    <TextFieldHContainer>
      <label style={labelStyle}>{label}</label>
      <SelectImageH
        style={inputStyle}
        setSelectedImage={setValue}
        {...inputProps}
      />
    </TextFieldHContainer>
  );
};

export default TextFieldSelectImageH;
