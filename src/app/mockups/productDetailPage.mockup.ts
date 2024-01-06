import { IProductDetailPage } from '../models/product.model';

export const productDetailPage: IProductDetailPage = {
  stock: 5,
  name: 'Dune navy daning side',
  brand: 'Samsung',
  image_cover: 'assets/images/samsungtv-mockup.svg',
  friendly_url: 'google.com',
  special_price: 1200,
  price: 1900,
  extraImages: [
    'assets/images/Mano.png',
    'assets/images/loading.gif',
    'assets/images/samsungtv-mockup.svg',
    'assets/images/samsungtv-mockup.svg',
  ],
  supplier: 'Label',
  detail_list: [
    {
      title: "Especificaciones",
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
      title: "Ficha técnica",
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }
  ],
  deliveryInformation: {
    deliveryTitle: 'Delivery Lima y Provincias',
    deliveryBody:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  },
};

export const productDetailPage2: IProductDetailPage = {
  name: 'Dune navy daning side',
  brand: 'Samsung',
  image_cover: 'assets/images/samsungtv-mockup.svg',
  friendly_url: 'google.com',
  special_price: 1200,
  price: 1900,
  colors: [
    { colorName: 'blanco', colorHex: '#fff' },
    { colorName: 'negro', colorHex: '#000' },
    { colorName: 'rojo', colorHex: '#f00' },
  ],
  sizes: ['xs', 's', 'm', 'l', 'xl'],
  stockPerColorAndSize: [
    {
      color: 'blanco',
      size: 'xs',
      stock: 5,
    },
    {
      color: 'blanco',
      size: 's',
      stock: 6,
    },
    {
      color: 'blanco',
      size: 'm',
      stock: 7,
    },
    {
      color: 'rojo',
      size: 'l',
      stock: 5,
    },
    {
      color: 'rojo',
      size: 'xl',
      stock: 6,
    },
    {
      color: 'rojo',
      size: 'xs',
      stock: 7,
    },
    {
      color: 'negro',
      size: 's',
      stock: 5,
    },
    {
      color: 'negro',
      size: 'm',
      stock: 6,
    },
    {
      color: 'negro',
      size: 'xl',
      stock: 7,
    },
  ],
  extraImages: [
    'assets/images/Mano.png',
    'assets/images/loading.gif',
    'assets/images/samsungtv-mockup.svg',
    'assets/images/samsungtv-mockup.svg',
  ],
  supplier: 'Label',
  detail_list: [
    {
      title: "Especificaciones",
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
      title: "Ficha técnica",
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }
  ],
  deliveryInformation: {
    deliveryTitle: 'Delivery Lima y Provincias',
    deliveryBody:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  },
};

export const productDetailPage3: IProductDetailPage = {
  name: 'Dune navy daning side',
  brand: 'Samsung',
  image_cover: 'assets/images/samsungtv-mockup.svg',
  friendly_url: 'google.com',
  special_price: 1200,
  price: 1900,
  colors: [
    { colorName: 'blanco', colorHex: '#fff' },
    { colorName: 'negro', colorHex: '#000' },
    { colorName: 'rojo', colorHex: '#f00' },
  ],
  stockPerColor: [
    {
      color: 'blanco',
      stock: 5,
    },
    {
      color: 'rojo',
      stock: 7,
    },
    {
      color: 'negro',
      stock: 9,
    },
  ],
  extraImages: [
    'assets/images/Mano.png',
    'assets/images/loading.gif',
    'assets/images/samsungtv-mockup.svg',
    'assets/images/samsungtv-mockup.svg',
  ],
  supplier: 'Label',
  detail_list: [
    {
      title: "Especificaciones",
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
      title: "Ficha técnica",
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }
  ],
  deliveryInformation: {
    deliveryTitle: 'Delivery Lima y Provincias',
    deliveryBody:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  },
};

export const productDetailPage4: IProductDetailPage = {
  name: 'Dune navy daning side',
  brand: 'Samsung',
  image_cover: 'assets/images/samsungtv-mockup.svg',
  friendly_url: 'google.com',
  special_price: 1200,
  price: 1900,
  sizes: ['xs', 's', 'm', 'l', 'xl'],
  stockPerSize: [
    {
      size: 'l',
      stock: 0,
    },
    {
      size: 'xl',
      stock: 9,
    },
    {
      size: 'xs',
      stock: 7,
    },
    {
      size: 's',
      stock: 0,
    },
    {
      size: 'm',
      stock: 6,
    },
  ],
  extraImages: [
    'assets/images/Mano.png',
    'assets/images/loading.gif',
    'assets/images/samsungtv-mockup.svg',
    'assets/images/samsungtv-mockup.svg',
  ],
  supplier: 'Label',
  detail_list: [
    {
      title: "Especificaciones",
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
      title: "Ficha técnica",
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }
  ],
  deliveryInformation: {
    deliveryTitle: 'Delivery Lima y Provincias',
    deliveryBody:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  },
};
