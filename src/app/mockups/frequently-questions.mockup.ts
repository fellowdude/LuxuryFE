import {
  IFrequentlyQuestionsPage,
  IQuestionAnswer,
} from '../models/frequently-questions.model';

export const questionsAnswers: IQuestionAnswer[] = [
  {
    question: '¿Dónde puedo usar mi Tarjeta Luxury?',
    answer:
      '<p>La tarjeta Luxury es aceptada en todos los establecimientos afiliados al Programa de Beneficios Luxury. La relación de establecimientos afiliados puede encontrarla en www.luxury.pe y de igual manera dichos establecimientos cuentan con una placa identificadora en los locales afiliados.</p>',
  },
  {
    question: '¿Puedo pagar con mi Tarjeta Luxury?',
    answer:
      'No. La tarjeta Luxury no es transaccional. El objetivo de la misma es permitir la identificación de los clientes y usuarios del programa en los establecimientos afiliados.',
  },
  {
    question: '¿Qué hacer en caso pierda mi tarjeta Luxury?',
    answer:
      'En caso de pérdida o robo de la tarjeta Luxury, debe comunicarse inmediatamente al 208-0333.',
  },
  {
    question:
      '¿Que hacer en caso el establecimiento afiliado no reconozca mi tarjeta Luxury?',
    answer:
      'En caso el personal del establecimiento afiliado no reconozca los beneficios y el uso de la tarjeta Luxury, debe solicitar la presencia del Gerente del establecimiento quien solucionará inmediatamente el impase. En caso de persistir el inconveniente puede contactarse con el Contact Center Luxury al 208-0333.',
  },
];

export const frequentlyQuestionsPage: IFrequentlyQuestionsPage = {
  titleBanner: 'Preguntas Frequentes',
  bannerImage: 'assets/images/samsung-desktop-banner.svg',
  questionsAnswers,
};
