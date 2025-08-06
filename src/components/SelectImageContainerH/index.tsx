import SelectImageH from "@/components/SelectImageH";
import { useSnackbar } from "notistack";
import { type Dispatch, type SetStateAction, useMemo } from "react";
import { type CSSProperties } from "styled-components";
import {
    SelectImageContainerInfos,
    SelectImageContainerOutsideContainer,
    SelectImageContainerRoot,
} from "./style";

interface SelectImageContainerHProps {
    value?: File | null;
    setValue: Dispatch<SetStateAction<File | null>>;
    style?: CSSProperties;
    minWidth?: string;
    minHeigth?: string;
    error?: boolean;
}

const SelectImageContainerH = ({
    setValue,
    value,
    style,
    minHeigth,
    minWidth,
    error,
}: SelectImageContainerHProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const fileImageUrl = useMemo(() => {
        if (value) {
            return URL.createObjectURL(value);
        }
    }, [value]);

    const onDrop = (event: any) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const file = droppedFiles[0];

            if (!file.type.startsWith("image/")) {
                enqueueSnackbar("Selecione uma imagem!", {
                    variant: "error",
                });
            }

            setValue(file);
        }
    };

    return (
        <SelectImageContainerOutsideContainer
            style={style}
            onDrop={onDrop}
            onDragOver={(event) => event.preventDefault()}
        >
            <SelectImageContainerRoot $error={error}>
                {value ? (
                    <img
                        src={fileImageUrl}
                        alt="imagem-selected-dropzone"
                        style={{ width: "100%", height: "100%" }}
                    />
                ) : (
                    <SelectImageContainerInfos>
                        <SelectImageH
                            setSelectedImage={setValue}
                            containerStyle={{ width: "100%" }}
                        />
                        <span>
                            Ou arraste a imagem até aqui!{" "}
                            {minHeigth && minWidth
                                ? `${minWidth} x ${minHeigth}`
                                : false}
                        </span>
                    </SelectImageContainerInfos>
                )}
            </SelectImageContainerRoot>
            {value && (
                <SelectImageH
                    setSelectedImage={setValue}
                    containerStyle={{ width: "40%" }}
                />
            )}
        </SelectImageContainerOutsideContainer>
    );
};

export default SelectImageContainerH;
