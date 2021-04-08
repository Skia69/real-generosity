import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Box, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const items = [
  {
    id: '101',
    name: 'T-Shirt',
    date: 'Wed May 27 2020 09:59:56 GMT+0530',
    location: {
      name: 'blabla',
      coords: { lat: '33.8333', lng: '35.8333' },
    },
    category: 'Clothes',
    imageURL: [
      'https://www.marni.com/12/12386489MT_13_n_r.jpg',
      'https://www.marni.com/12/12386489MT_13_n_r.jpg',
      'https://www.marni.com/12/12386489MT_13_n_r.jpg ',
    ],
    description:
      'size: medium kdhiun nkjrenw uoewij iejhrioj hiserji huiehi hisoejo',
    ownerId: '88978628',
    Active: true,
    isDelivered: false,
    reports: [{ id: '3015' }, { id: '3016' }, { id: '3017' }],
    requests: [
      { id: '2010' },
      { id: '2013' },
      { id: '201' },
      { id: '2010' },
      { id: '2010' },
    ],
  },

  {
    id: '102',
    name: 'Sofa',
    date: 'tues May 26 2020 09:59:56 GMT+0530',
    location: [31.2443, 16.2445],
    category: 'Furniture',
    imageURL: [
      'https://media.karousell.com/media/photos/products/2020/10/11/used_sofa_1602420898_6ae9d381.jpg',
      'https://media.karousell.com/media/photos/products/2020/10/11/used_sofa_1602420898_6ae9d381.jpg',
      'https://media.karousell.com/media/photos/products/2020/10/11/used_sofa_1602420898_6ae9d381.jpg ',
    ],
    description: '5-6 months',
    ownerId: '88978628',
    Active: true,
    isDelivered: false,
    reports: [{ id: '3010' }, { id: '3011' }],
    requests: [{ id: '2011' }],
  },
  {
    id: '103',
    name: 'Phone',
    date: 'tues May 26 2020 09:59:56 GMT+0530',
    location: [31.2443, 16.2445],
    category: 'Toys',
    imageURL: [
      'https://i.guim.co.uk/img/media/75412bb0723270b6e0d29b8655c341e2c34c85cc/546_0_2031_2032/master/2031.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=fd9b3dc0572b7bdf3e964621501b6ec2',
      'https://i.guim.co.uk/img/media/75412bb0723270b6e0d29b8655c341e2c34c85cc/546_0_2031_2032/master/2031.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=fd9b3dc0572b7bdf3e964621501b6ec2',
      'https://i.guim.co.uk/img/media/75412bb0723270b6e0d29b8655c341e2c34c85cc/546_0_2031_2032/master/2031.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=fd9b3dc0572b7bdf3e964621501b6ec2',
    ],
    description: 'good quality',
    ownerId: '88978628',
    Active: true,
    isDelivered: false,
    reports: [],
    requests: [{ id: '2012' }],
  },
];

const Carouselimg = () => {
  const { id } = useParams();
  const item = items.find((item) => item.id === id);
  return (
    <Carousel autoPlay>
      <Box>
        <Image boxSize="500px" src={`${item.imageURL[0]}`}></Image>
      </Box>
      <Box>
        <Image boxSize="500px" src={`${item.imageURL[2]}`}></Image>
      </Box>
      <Box>
        <Image boxSize="500px" src={`${item.imageURL[2]}`}></Image>
      </Box>
    </Carousel>
  );
};
export default Carouselimg;
