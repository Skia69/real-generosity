import { Box, Flex, Heading, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';

const CardList = ({ items }) => {
  const { t } = useTranslation();

  return (
    <>
      <Flex w="7xl" justifyContent="space-between" fontSize="md" mb="5px">
        <Heading size="lg" color="green.500" mb={5} fontWeight="semibold">
          {t('cardlist.heading')}
        </Heading>

        <Box>
          <Link to="/items">
            <Heading size="md" color="blue.400" fontWeight="semibold">
              {t('cardlist.heading1')}
            </Heading>
          </Link>
        </Box>
      </Flex>
      <HStack spacing={4} wrap="wrap">
        {items.map((item) => {
          return (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Card key={item.id} id={item.id} {...item.data()} />
            </motion.button>
          );
        })}
      </HStack>
    </>
  );
};

export default CardList;
