import { Box, Grid, Flex } from '@chakra-ui/react';
import React from 'react';
import Card from '../Card';
import { motion } from 'framer-motion';
const ItemsList = ({ items }) => {
  return (
    <>
      <Box d={{ base: 'none', md: 'block' }} h={800} overflowY="auto">
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          gap={4}
          py={4}
        >
          {items.map((item) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Card key={item.id} id={item.id} {...item.data()} />
            </motion.button>
          ))}
        </Grid>
      </Box>
      <Flex d={{ base: 'flex', lg: 'none' }} maxW="100vw" overflowX="scroll">
        {items.map((item) => (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
            <Card key={item.id} id={item.id} {...item.data()} />
          </motion.button>
        ))}
      </Flex>
    </>
  );
};

export default ItemsList;
