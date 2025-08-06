import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "@mui/joy/Textarea";
import { Button, IconButton, Switch, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useQueryClient } from "@tanstack/react-query";
import { adicionarEventAdmService } from "@/api/admin/eventos/eventosAdmAPI";
import AdmLocationInput from "@/components/AdmLocationInput";
import SelectImageContainerH from "@/components/SelectImageContainerH";
import TitleH from "@/components/TitleH";
import dayjs from "dayjs";
import { ADM_QUERIES } from "@/hooks/queryConsts";
import { useSnackbar } from "notistack";
import { CaretLeft, List, Trash } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    AddEditEventAdmDTO,
    ListMinisterioDTO,
    LocationMapType,
} from "@/types/admDTOTypes";
import { maskForValueInReal } from "@/utils/masks";
import * as yup from "yup";
import ModalSelecionarMinisterio from "../components/ModalSelecionarMinisterio";
import { ModalSelecionarMinisterioItem } from "../components/ModalSelecionarMinisterio/style";
import {
    AdmAdicionarEditarEventoContainer,
    AdmAdicionarEditarEventoForm,
    AdmAdicionarEditarEventoInputs,
} from "./style";

const schema = yup
    .object({
        titulo: yup.string().required("Digite um titulo!").trim(),
        descricao: yup.string().trim(),
        date: yup.string().required("Digite uma data!"),
        localizacao: yup
            .string()
            .required("Digite uma localização")
            .trim(),
        valorDoEvento: yup.string(),
        destaque: yup.boolean(),
    })
    .required();
interface SchemaAdicionarEventoType {
    titulo: string;
    descricao: string;
    date: Date;
    localizacao: string;
    valorDoEvento?: string;
    destaque?: boolean;
}

const AdmAdicionarEvento = () => {
    const navigator = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const [banner, setBanner] = useState<
        File | null
    >(null);
    const [imagem, setImagem] = useState<
        File | null
    >(null);
    const [errorBanner, setErrorBanner] = useState<boolean>(false);
    const [errorImagem, setErrorImagem] = useState<boolean>(false);

    const [ministerioSelected, setMinisterioSelected] = useState<
        ListMinisterioDTO[]
    >([]);
    const [showMinisteriosModal, setShowMinisteriosModal] =
        useState<boolean>(false);

    const [isPago, setIsPago] = useState<boolean>(false);
    const [locationInfos, setLocationInfos] =
        useState<LocationMapType>();

    const handleGoBack = () => {
        navigator(-1);
    };

    const onSubmit = async (data: any, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        if (!validateForms()) {
            return;
        }

        let ministerioIdsSelecionados = ministerioSelected.map((item) => item.id) || [];

        try {
            const dto: AddEditEventAdmDTO = {
                date: dayjs(data.date).toDate(),
                descricao: data.descricao || null,
                destaque: data.destaque,
                localEvento: {
                    latitude: locationInfos?.lat,
                    localizacao: data.localizacao,
                    longitude: locationInfos?.lng,
                },
                titulo: data.titulo,
                ministeriosAssociados: ministerioIdsSelecionados.length === 0 ? undefined : ministerioIdsSelecionados,
                valorDoEvento: data.valorDoEvento || 0,
            };
            const formData = new FormData();
            formData.append("request", new Blob([JSON.stringify(dto)], { type: "application/json" }));
            formData.append("fileBanner", banner!);
            formData.append("fileImage", imagem!);
            const response = await adicionarEventAdmService(formData);

            if (response) {
                enqueueSnackbar("Evento adicionado com sucesso", {
                    variant: "success",
                });
                queryClient.refetchQueries({
                    queryKey: [ADM_QUERIES.LIST_EVENTS_ADM],
                });
                navigator(-1);
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar(
                "Error ao adicionar o evento, tente novamente!",
                {
                    variant: "error",
                },
            );
        }
    };

    const validateForms = () => {
        let value = false;

        if (imagem != null) {
            value = true;
            setErrorImagem(false);
        } else {
            value = false;
            setErrorImagem(true);
            enqueueSnackbar("Insira uma imagem para o evento!", {
                variant: "error",
            });
        }
        if (banner != null) {
            value = true;
            setErrorBanner(false);
        } else {
            value = false;
            setErrorBanner(true);
            enqueueSnackbar("Insira um banner para o evento!", {
                variant: "error",
            });
        }

        return value;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Impede a submissão do formulário
        }
    };

    return (
        <AdmAdicionarEditarEventoContainer>
            <TitleH color="black" size="medium">
                <IconButton onClick={handleGoBack}>
                    <CaretLeft size={32} />
                </IconButton>{" "}
                Adicionar evento
            </TitleH>
            <AdmAdicionarEditarEventoForm onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
                <label className="form-controller">Banner</label>
                <SelectImageContainerH
                    error={errorBanner}
                    style={{ width: "100%", height: 425 }}
                    setValue={setBanner}
                    minHeigth="375"
                    minWidth="1440"
                    value={banner}
                />
                <label className="form-controller">Foto do evento</label>
                <SelectImageContainerH
                    error={errorImagem}
                    style={{ width: "70%", height: 375 }}
                    setValue={setImagem}
                    minHeigth="375"
                    minWidth="875"
                    value={imagem}
                />
                <AdmAdicionarEditarEventoInputs>
                    <div className="input-container">
                        <label className="form-controller">Titulo</label>
                        <TextField
                            inputProps={{ ...register("titulo") }}
                            label="Titulo"
                            error={!!errors["titulo"]}
                            helperText={errors["titulo"]?.message}
                        />
                    </div>
                    <div className="input-container">
                        <label className="form-controller">Descrição</label>
                        <Textarea
                            {...register("descricao")}
                            minRows={2}
                            placeholder="Descrição"
                        />
                    </div>
                    <div className="input-container">
                        <label className="form-controller">Data e horário</label>
                        <DateTimePicker
                            label="Data e horário"
                            disablePast
                            value={dayjs(getValues("date"))}
                            slotProps={{
                                textField: {
                                    error: !!errors["date"],
                                    helperText: errors["date"]?.message,
                                },
                            }}
                            onChange={(value) =>
                                setValue("date", value?.toISOString() || "")
                            }
                            format="DD/MM/YYYY HH:mm"
                            ampm={false}
                        />
                    </div>
                    <div className="input-container">
                        <label className="form-controller">Localização</label>
                        <AdmLocationInput
                            onPlaceSelect={(place) =>
                                setValue("localizacao", place)
                            }
                            onLocationSelect={(location) =>
                                setLocationInfos(location)
                            }
                            place={getValues("localizacao")}
                            textFieldProps={{
                                error: !!errors["localizacao"],
                                helperText: errors["localizacao"]?.message,
                            }}
                        />
                    </div>
                    <div className="input-container">
                        <label className="form-controller">
                            Ministérios participantes
                            <IconButton
                                onClick={() => {
                                    setShowMinisteriosModal(!showMinisteriosModal);
                                }}
                            >
                                <List size={28} />
                            </IconButton>
                        </label>
                        <div style={{ maxHeight: 120, overflowY: "auto" }}>
                            {ministerioSelected.map((item, index) => {
                                return <ModalSelecionarMinisterioItem key={index}>
                                    <div className="left">
                                        <img className="image" src={item.fileImageUrl} alt={item.nome} />
                                        <label className="title">{item.nome}</label>
                                    </div>
                                    <IconButton onClick={() => {
                                        let ministeriosSelectedProv = ministerioSelected.filter((itemFilter) => itemFilter !== item);
                                        setMinisterioSelected(ministeriosSelectedProv);
                                    }}>
                                        <Trash size={24} color="#F44336" />
                                    </IconButton>
                                </ModalSelecionarMinisterioItem>
                            })}
                        </div>
                        <ModalSelecionarMinisterio
                            onClose={() => setShowMinisteriosModal(false)}
                            children={<></>}
                            open={showMinisteriosModal}
                            ministeriosSelected={ministerioSelected}

                            setMinisterios={setMinisterioSelected}
                        />
                    </div>
                    <div className="input-container">
                        <label className="form-controller">
                            Destacar evento?
                        </label>
                        <Switch
                            color="primary"
                            size="medium"
                            value={getValues("destaque")}
                            onChange={(e, checked) => setValue("destaque", checked)}
                        />
                    </div>
                    <div className="input-container">
                        <label className="form-controller">É pago?</label>
                        <Switch
                            color="primary"
                            size="medium"
                            value={isPago}
                            onChange={(e, checked) => setIsPago(checked)}
                        />
                    </div>
                    {isPago && (
                        <div className="input-container">
                            <label className="form-controller">
                                Valor do evento
                            </label>
                            <TextField
                                inputProps={{
                                    ...register("valorDoEvento"),
                                    onChange: (e) => {
                                        setValue("valorDoEvento", maskForValueInReal(e));
                                    },
                                }}
                            />
                        </div>
                    )}
                </AdmAdicionarEditarEventoInputs>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: "40%", mt: 4 }}
                >
                    Adicionar evento
                </Button>
            </AdmAdicionarEditarEventoForm>
        </AdmAdicionarEditarEventoContainer>
    );
};

export default AdmAdicionarEvento;
