import { ArrowUpRight } from "phosphor-react";
import type { ListEventsDTO } from "@/types/dtoTypes";
import { CardEventContainer } from "./style";
import SemImagemEvento from "@/assets/not_found_image_evento1.png";

interface CardEventProps {
    event: ListEventsDTO;
}

const CardEvent = ({ event }: CardEventProps) => {
    return (
        <CardEventContainer>
            <img src={event.image_url.includes("storage") ? event.image_url :  SemImagemEvento} alt={`image-event-${event.id}`} />
            <label className="title">{event.title}</label>
            <button className="floating_redirect_button">
                <ArrowUpRight color="#252525" size={28} />
            </button>
            <div className="informative_chip">
                <span className="text">Evento</span>
            </div>
        </CardEventContainer>
    )
}

export default CardEvent