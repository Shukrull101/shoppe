import img1 from '../assets/shop/Img_01_Blog.png';
import img2 from '../assets/shop/Img_02_Blog.png';
import img3 from '../assets/shop/Img_03_Blog.png';
import img4 from '../assets/shop/Img_04_Blog.png';
import imgSecondary1 from '../assets/shop/Img_05.png';
import imgSecondary2 from '../assets/shop/Img_06.png';
import avatar1 from '../assets/shukrullo/profile.png';

const baseContent = [
  { type: 'paragraph', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue.' },
  { type: 'paragraph', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis.' },
  { type: 'image', src: imgSecondary1 },
  { type: 'subtitle', text: 'Top trends' },
  { type: 'paragraph', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero.' },
  { type: 'list', items: [
      'consectetur adipiscing elit. Aliquam placerat',
      'lorem ipsum dolor sit amet consectetur',
      'sapien tortor faucibus augue',
      'a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis'
  ]}
];

const mockComments = [
  {
    id: 1,
    name: 'Scarlet witch',
    date: '6 May, 2020',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.',
    avatar: avatar1, // We'll just reuse the profile icon
    replies: [
      {
        id: 2,
        name: 'Kate moss',
        date: '6 May, 2020',
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.',
        avatar: avatar1,
      }
    ]
  },
  {
    id: 3,
    name: 'Scarlet witch',
    date: '6 May, 2020',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    avatar: avatar1,
    replies: []
  }
];

export const posts = [
  {
    id: 1,
    title: 'Top Trends From Spring',
    author: 'ANNY JOHNSON',
    category: 'Fashion',
    date: 'October 8, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. faucibus augue, a maximus elit ex vitae libero..',
    image: img1,
    tags: ['Fashion', 'Style', 'Season'],
    content: baseContent,
    initialComments: mockComments,
  },
  {
    id: 2,
    title: 'How to match accessories',
    author: 'ANNY JOHNSON',
    category: 'Accessories',
    date: 'October 10, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. faucibus augue, a maximus elit ex vitae libero..',
    image: img2,
    tags: ['Accessories', 'Fashion'],
    content: [
      ...baseContent.slice(0, 2),
      { type: 'image', src: imgSecondary2 },
      ...baseContent.slice(3)
    ],
    initialComments: mockComments,
  },
  {
    id: 3,
    title: 'Autumn fashion ideas',
    author: 'JOHN DOE',
    category: 'Season',
    date: 'October 12, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. faucibus augue, a maximus elit ex vitae libero..',
    image: img3,
    tags: ['Season', 'Style'],
    content: baseContent,
    initialComments: [],
  },
  {
    id: 4,
    title: 'Minimalist style guide',
    author: 'JANE SMITH',
    category: 'Style',
    date: 'October 14, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. faucibus augue, a maximus elit ex vitae libero..',
    image: img4,
    tags: ['Style', 'Fashion', 'Minimalist'],
    content: baseContent,
    initialComments: mockComments,
  },
  {
    id: 5,
    title: 'Best Spring Outfits',
    author: 'ANNY JOHNSON',
    category: 'Fashion',
    date: 'October 16, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. faucibus augue, a maximus elit ex vitae libero..',
    image: img1,
    tags: ['Fashion', 'Season'],
    content: baseContent,
    initialComments: [],
  },
  {
    id: 6,
    title: 'Watches for every occasion',
    author: 'MICHAEL BROWN',
    category: 'Accessories',
    date: 'October 18, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. faucibus augue, a maximus elit ex vitae libero..',
    image: img2,
    tags: ['Accessories', 'Watches'],
    content: baseContent,
    initialComments: mockComments,
  },
  {
    id: 7,
    title: 'Winter coats collection',
    author: 'EMILY WHITE',
    category: 'Season',
    date: 'October 20, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. faucibus augue, a maximus elit ex vitae libero..',
    image: img3,
    tags: ['Season', 'Winter', 'Fashion'],
    content: baseContent,
    initialComments: [],
  },
  {
    id: 8,
    title: 'Color theory in clothing',
    author: 'DAVID BLACK',
    category: 'Style',
    date: 'October 22, 2020',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. faucibus augue, a maximus elit ex vitae libero..',
    image: img4,
    tags: ['Style', 'Color', 'Guide'],
    content: baseContent,
    initialComments: mockComments,
  }
];
