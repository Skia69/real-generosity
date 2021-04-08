import { Button, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
const CATEGORIES = [
  'All',
  'Books',
  'Appliances',
  'Toys',
  'Clothes',
  'Medics',
  'Furniture',
];

const Filters = () => {
  const { category } = useParams();
  const renders = React.useRef(0);
  console.log('Filters.jsx renders', renders.current++);
  return (
    <HStack wrap="wrap">
      {CATEGORIES.map((cat, index) =>
        cat === 'All' ? (
          <Link key={index} to={`/items`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                my={2}
                colorScheme={category === undefined ? 'green' : null}
              >
                {cat}
              </Button>
            </motion.button>
          </Link>
        ) : (
          <Link key={index} to={`/items/${cat.toLowerCase()}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                my={2}
                colorScheme={cat.toLowerCase() === category ? 'green' : null}
              >
                {cat}
              </Button>
            </motion.button>
          </Link>
        )
      )}
    </HStack>
  );
};

export default Filters;
