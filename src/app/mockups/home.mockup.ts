import { ICarouselBanner } from '../models/carousel-banner.model';
import { ICarouselImage } from '../models/carousel-banner.model';

export const CarouselBannerItem: ICarouselBanner = {
    animation: true,
    arrows: false,
    autoplay: true,
    interval: 5000,
    itemsPerSlide: 1,
    indicators: true,
    banners: [
        {
            imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/e7936150-7322-11eb-8e26-554608aa234f",
            title: "Nueva categoría Especiales",
            subtitle: "¡Descuentos semanales por tiempo limitado⏱️!",
            buttonLabel: "Ver Promociones",
            redirectURL: "/principal/product/especiales"
        },
        {
            imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/6b9cd0a1-6ff2-11eb-a375-2dc378933419",
            title: "Verano SBP",
            subtitle: "¡Entregas en su casa de playa en 24 horas 🏖️!",
            buttonLabel: "Ver Promociones",
            redirectURL: "/principal/product/verano_sbp"
        },
        {
            imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/f8e560f1-7d06-11eb-aa6f-b3b706618821",
            title: "Vinos en lata Coppola y Santa Rita",
            subtitle: null,
            buttonLabel: "Ver Promociones",
            redirectURL: "/principal/product/especiales/vinos_en_lata_coppola_y_santa_rita"
        },
        {
            imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/93972b70-7eaa-11eb-aa6f-b3b706618821",
            title: "¡Semana de la mujer!",
            subtitle: null,
            buttonLabel: null,
            redirectURL: "/principal/product/especiales/¡semana_de_la_mujer"
        },
    ]
}

const HomeBannerItem1: ICarouselImage = {
    imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/d7dd6620-e191-11ea-b0e2-b164d564f4a5",
    title: "Nueva categoría Especiales",
    subtitle: "¡Descuentos semanales por tiempo limitado!",
    buttonLabel: "Ver Promociones",
    redirectURL: "/principal/product/especiales"
}

const HomeBannerItem2: ICarouselImage = {
    imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/efb5cd10-9be4-11eb-a1b1-69c3639ec72c",
    title: "Nueva categoría Especiale",
    subtitle: "¡Descuentos semanales por tiempo limitado!",
    buttonLabel: "Ver Promociones",
    redirectURL: "/principal/product/especiales"
}

const HomeBannerItem3: ICarouselImage = {
    imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/ee137de0-9d88-11eb-998c-af248030fe96",
    title: "Nueva categoría Especial",
    subtitle: "¡Descuentos semanales por tiempo limitado!",
    buttonLabel: "Ver Promociones",
    redirectURL: "/principal/product/especiales"
}

const HomeBannerItem4: ICarouselImage = {
    imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/c5227c60-f464-11ea-9dd1-73113bde9ab2",
    title: "Nueva categoría Especia",
    subtitle: "¡Descuentos semanales por tiempo limitado!",
    buttonLabel: "Ver Promociones",
    redirectURL: "/principal/product/especiales"
}

const HomeBannerItem5: ICarouselImage = {
    imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/efb5cd10-9be4-11eb-a1b1-69c3639ec72c",
    title: "Nueva categoría Especi",
    subtitle: "¡Descuentos semanales por tiempo limitado!",
    buttonLabel: "Ver Promociones",
    redirectURL: "/principal/product/especiales"
}

const HomeBannerItem6: ICarouselImage = {
    imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/e7936150-7322-11eb-8e26-554608aa234f",
    title: "Nueva categoría Espec",
    subtitle: "¡Descuentos semanales por tiempo limitado!",
    buttonLabel: "Ver Promociones",
    redirectURL: "/principal/product/especiales"
}

const HomeBannerItem7: ICarouselImage = {
    imageURL: "https://d1oo5kg0wy01y2.cloudfront.net/storage-attachment/e7936150-7322-11eb-8e26-554608aa234f",
    title: "Nueva categoría Espe",
    subtitle: "¡Descuentos semanales por tiempo limitado!",
    buttonLabel: "Ver Promociones",
    redirectURL: "/principal/product/especiales"
}

export const HomeBannerList: Array<ICarouselImage> = [HomeBannerItem1, HomeBannerItem2, HomeBannerItem3, HomeBannerItem4, HomeBannerItem5, HomeBannerItem6, HomeBannerItem7];