import img1 from '../assets/shop/Img_01.png';
import img2 from '../assets/shop/Img_02.png';
import img3 from '../assets/shop/Img_03.png';
import img4 from '../assets/shop/Img_04.png';
import img5 from '../assets/shop/Img_05.png';
import img6 from '../assets/shop/Img_06.png';

export const products = [
  {
    id: 1,
    title: 'Lira Earrings',
    price: '$ 20,00',
    badge: '- %21',
    badgeColor: 'bg-[#A18A68] text-white',
    image: img1,
    reviews: [
      {
        id: 1,
        author: 'Scarlet withch',
        date: '6 May, 2020',
        rating: 3,
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.'
      },
      {
        id: 2,
        author: 'Scarlet withch',
        date: '6 May, 2020',
        rating: 3,
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.'
      }
    ]
  },
  {
    id: 2,
    title: 'Hal Earrings',
    price: '$ 25,00',
    image: img2,
  },
  {
    id: 3,
    title: 'Kaede Hair Pin Set Of 3',
    price: '$ 30,00',
    image: img3,
  },
  {
    id: 4,
    title: 'Hair Pin Set of 3',
    price: '$ 30,00',
    image: img4,
  },
  {
    id: 5,
    title: 'Plaine Necklace',
    price: '$ 19,00',
    badge: 'Sold out',
    badgeColor: 'bg-[#A18A68] text-white',
    image: img5,
  },
  {
    id: 6,
    title: 'Yuki Hair Pin Set of 3',
    price: '$ 29,00',
    image: img6,
  },
];
