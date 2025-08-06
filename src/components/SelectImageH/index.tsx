import { useSnackbar } from "notistack";
import { ImageSquare } from "phosphor-react";
import { type Dispatch, type HTMLProps, type SetStateAction, useRef } from "react";
import { type CSSProperties } from "styled-components";
import { SelectImageHContainer } from "./style";

interface SelectImageH extends HTMLProps<HTMLInputElement> {
    setSelectedImage: Dispatch<
        SetStateAction<File | null>
    >;
    containerStyle?: CSSProperties;
}

const SelectImageH = ({
    setSelectedImage,
    containerStyle,
    ...props
}: SelectImageH) => {
    const refInput = useRef<HTMLInputElement>(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleFileChange = (event: any) => {
        try {
            const file = event.target.files[0];

            if (!file.type.startsWith("image/")) {
                enqueueSnackbar("Selecione uma imagem!", {
                    variant: "error",
                });
            }
            setSelectedImage(file);
        } catch (error) {
            console.error("Cancel file choose");
        }
    };

    return (
        <SelectImageHContainer style={containerStyle}>
            <input
                id="inputPhoto"
                ref={refInput}
                onChange={(e) => handleFileChange(e)}
                type="file"
                {...props}
            />
            <label>Selecionar imagem</label>
            <hr />
            <ImageSquare
                size={24}
                onClick={() => refInput.current?.click()}
            />
        </SelectImageHContainer>
    );
};

export default SelectImageH;
