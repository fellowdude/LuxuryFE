import { IMobileLateralComponent } from '../models/header.model';

export const mobileLateralItem: IMobileLateralComponent = {
  profileLastName: 'Sr. Desarrollo',
  number_card: '5420000041',
  items: [
    {
      className: 'account-list',
      name: 'Mi cuenta',
      searchBox: false,
      items: [
        {
          name: 'Mis datos',
          url: '/perfil/mis-datos',
        },
        {
          name: 'Mis direcciones',
          url: '/perfil/mis-direcciones',
        },
        {
          name: 'Historial',
          url: '/perfil/historial',
        },
        {
          name: 'Historial',
          url: '/perfil/beneficios',
        },
        {
          name: 'Califica tus experiencias',
          url: '/perfil/rate-experience',
        },
      ],
    },
    {
      className: 'service-list',
      name: 'Servicio al cliente',
      searchBox: false,
      items: [
        {
          name: 'Preguntas frecuentes',
          url: '/preguntas-frecuentes',
        },
        {
          name: 'Libro de reclamaciones',
          url: '/libro-reclamaciones',
        },
        {
          name: 'Términos y condiciones',
          url: '/terminos-condiciones',
        },
        {
          name: 'Políticas de privacidad',
          url: '/politicas-privacidad',
        },
      ],
    },
  ],
};

// export const mobileLateralItem: IMobileLateralComponent = {
//   profileLastName: 'Sr. Desarrollo',
//   number_card: '5420000041',
//   items: [
//     {
//       className: 'category-list',
//       name: 'Categorias',
//       searchBox: false,
//       items: [
//         {
//           name: 'Sorteo SBP',
//           url: '/principal/product/sorteo_sbp',
//         },
//         {
//           name: 'Productos',
//           url: '/principal/product/catalogo',
//         },
//         {
//           name: 'Vinos y Licores',
//           url: '/principal/product/vinos_y_licores',
//         },
//         {
//           name: 'Minimarket',
//           url: '/principal/product/minimarket',
//         },
//         {
//           name: 'Experiencias',
//           url: '/principal/experience/experiencias',
//         },
//         {
//           name: 'Galería de Arte',
//           url: '/principal/experience/galeria_de_arte',
//         },
//         {
//           name: 'Inmobiliaria',
//           url: '/principal/experience/inmobiliaria',
//         },
//       ],
//     },
//     {
//       className: 'account-list',
//       name: 'Mi cuenta',
//       searchBox: false,
//       items: [
//         {
//           name: 'Mis datos',
//           url: '/perfil/mis-datos',
//         },
//         {
//           name: 'Mis direcciones',
//           url: '/perfil/mis-direcciones',
//         },
//         {
//           name: 'Historial',
//           url: '/perfil/historial',
//         },
//         {
//           name: 'Califica tus experiencias',
//           url: '/perfil/rate-experience',
//         },
//       ],
//     },
//     {
//       className: 'service-list',
//       name: 'Servicio al cliente',
//       searchBox: false,
//       items: [
//         {
//           name: 'Nosotros',
//           url: '/nosotros',
//         },
//         {
//           name: 'Preguntas frecuentes',
//           url: '/preguntas-frecuentes',
//         },
//         {
//           name: 'Términos y condiciones',
//           url: '/terminos-condiciones',
//         },
//         {
//           name: 'Políticas de privacidad',
//           url: '/politicas-privacidad',
//         },
//         {
//           name: 'Libro de reclamaciones',
//           url: '/libro-reclamaciones',
//         },
//       ],
//     },
//   ],
// };

export const groupCategoriesInfo = [
  {
    name: '%Open Sale',
    friendly_url: '',
    categories: [
      {
        name: 'Prueba',
        categoryImage: 'assets/images/category-mockup-image.svg',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        categoryImage: 'assets/images/category-mockup-image.svg',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        categoryImage: 'assets/images/category-mockup-image.svg',
        subcategories: [],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
    ],
  },
  {
    name: 'Especiales',
    friendly_url: '',
    categories: [
      {
        name: 'Prueba',
        categoryImage: 'assets/images/category-mockup-image.svg',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        categoryImage: 'assets/images/category-mockup-image.svg',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
    ],
  },
  {
    name: 'Verano SBP',
    friendly_url: '',
    categories: [
      {
        name: 'Prueba',
        categoryImage: 'assets/images/category-mockup-image.svg',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        categoryImage: 'assets/images/category-mockup-image.svg',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
    ],
  },
  {
    name: 'Productos',
    friendly_url: '',
    categoryImage: 'assets/images/category-mockup-image.svg',
    categories: [
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
    ],
  },
  {
    name: 'Vinos y Licores',
    friendly_url: '',
    categories: [
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
    ],
  },
  {
    name: 'SuperMarket',
    friendly_url: '',
    categories: [
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
    ],
  },
  {
    name: 'Experiencias',
    friendly_url: '',
    categories: [
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
    ],
  },
  {
    name: 'Galerías de Arte',
    friendly_url: '',
    categories: [
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
          {
            name: 'Prueba',
          },
        ],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
      {
        name: 'Prueba',
        subcategories: [],
      },
    ],
  },
];
