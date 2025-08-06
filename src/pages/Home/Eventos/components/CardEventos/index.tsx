import dayjs from "dayjs";
import { MapPin } from "phosphor-react";
import type { ListEventsDTO } from "@/types/dtoTypes";
import SemImagemEvento from "@/assets/Sem_imagem_eventos_Hallel.png";
import {
    CardEventosContainer,
    InfoCardEventosContainer,
} from "./style";

interface CardEventosProps {
    evento: ListEventsDTO;
}

const CardEventos = ({ evento }: CardEventosProps) => {
    return (
        <CardEventosContainer>
            {evento.image_url ? (
                <img
                    src={evento.image_url.includes("storage") ? evento.image_url :  SemImagemEvento}
                    alt={`evento-${evento.title}-image`}
                />
            ) : (
                <img
                    src={SemImagemEvento}
                    alt={`sem-imagem-${evento.title}`}
                />
            )}
            <InfoCardEventosContainer>
                <label className="date">
                    {dayjs(evento.date).format("DD/MM/YYYY")}
                </label>
                <h4 className="title">{evento.title}</h4>
                {evento.local_event_name && (
                    <span className="local">
                        <MapPin size={14} /> {evento.local_event_name}
                    </span>
                )}
            </InfoCardEventosContainer>
        </CardEventosContainer>
    );
};

export default CardEventos;
