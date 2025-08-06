import { useListEvents } from '@/hooks/useListEvents';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SemImagemEvento from "../../../../assets/not_found_image_evento1.png";
import { ContainerCarousel, DivItem, ImageItem, TitleEvents } from './styles';

const CarouselEvents = () => {

    const [slidesPerView, setSlidesPerView] = useState(4)
    const navigate = useNavigate()
    const { data: events } = useListEvents()

    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setSlidesPerView(1)
            }
            else {
                setSlidesPerView(4)
            }
        }

        handleResize()

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])

    const handleDetailsEvent = (eventId: string) => {
        navigate("/detalhesEvento", {
            state: {
                eventId: eventId
            }
        })
    }

    return (
        <ContainerCarousel>
            <Swiper
                slidesPerView={slidesPerView}
                modules={[Navigation, Pagination, A11y, Scrollbar]}
                spaceBetween={30}
                a11y={{ enabled: true }}
                title='Eventos'
            >
                {events?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <DivItem onClick={() => handleDetailsEvent(item.id)}>
                            {item.image_url ? (
                                <ImageItem
                                    src={item.image_url}
                                    alt={`evento-${item.title}-image`}
                                />
                            ) : (
                                <ImageItem
                                    src={SemImagemEvento}
                                    alt={`sem-imagem-${item.title}`}
                                />
                            )}
                            <TitleEvents>{item.title}</TitleEvents>
                        </DivItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </ContainerCarousel>
    )
}

export default CarouselEvents