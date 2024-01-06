import { IBenefitDetail, IBenefitData } from 'src/app/models/benefits.model';

const benefitDetail1: IBenefitDetail = {
    title: "Beneficio exclusivo para socios Luxury",
    text: `<p style="text-align: left; line-height: 1.15;">&nbsp;</p>
    <p style="text-align: left; line-height: 1.15;">Disfrute de un vuelo privado en el Jet Citation Excel de Lima a la ciudad de Santiago de Chile, con una exclusiva tarifa por ser socio Luxury, seg&uacute;n el destino, d&iacute;as, horarios y fechas de elecci&oacute;n. Este elegante <em>jet</em> tiene capacidad para siete pasajeros y cada uno de ellos podr&aacute; ingresar a la bodega un equipaje de 23 kilos y un bolso de mano de 10 kilos. Adem&aacute;s, contar&aacute; con los siguientes servicios: tripulaci&oacute;n, Handling y Catering Experience, que har&aacute;n de su traslado una experiencia inigualable.</p>
    <p style="text-align: left; line-height: 1.15;">&nbsp;</p>`
}

const benefitDetail2: IBenefitDetail = {
    title: "Tarifa One Way referencial:",
    text: `<p style="text-align: left; line-height: 1.15;">Lima &ndash; Santiago</p>
    <p style="text-align: left; line-height: 1.15;"><strong><span style="font-size: 18px; color: #000000;">Desde USD 22,400</span></strong></p>
    <p style="text-align: left; line-height: 1.15;">&nbsp;</p>`
}

const benefitDetail3: IBenefitDetail = {
    title: "Experiencia creada exclusivamente para socios Luxury",
    text: `<p style="text-align: left;">&nbsp;</p>
    <p style="text-align: left;"><em>Condiciones: Vigente hasta el 31/07/21. Establecimiento autorizado: Aviasur. Precio v&aacute;lido para vuelo One Way. El precio no incluye IGV. </em>En el caso de necesitar m&aacute;s d&iacute;as en destino, contactar para cotizar su solicitud a la medida en &nbsp;<a href="mailto:charter@aviasur.com">charter@aviasur.com</a>. <em>Aplican restricciones de peso y personas dependiendo del destino. Incluye comidas y bebidas Premium durante los vuelos. No incluye cambios de itinerario de vuelo una vez llegado a destino. Todo cambio de itinerario una vez iniciado el viaje tendr&aacute; un costo extra a la tarifa ofrecida. Sujeto a disponibilidad. Imagen referencial.</em></p>`
}

const benefitDetailList: Array<IBenefitDetail> = [benefitDetail1, benefitDetail2, benefitDetail3]

export const benefitData: IBenefitData = {
    detail: benefitDetailList,
    name: "Vuelo Privado Lima-Santiago de Chile",
    desktopBanner: "assets/images/samsung-desktop-banner.svg",
    mobileBanner: "assets/images/samsung-desktop-banner.svg"
}