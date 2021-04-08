import { Box, Flex, HStack, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { categories } from '../../assets/data/categories';
import { useParams } from 'react-router-dom';

const Header = ({ filteredCategoryCount, items }) => {
  const { category } = useParams();

  return (
    <Box
      py="10"
      px="10"
      my="50px"
      as="header"
      mx="auto"
      fontSize={30}
      fontWeight={600}
      height={200}
      width={1080}
      borderRadius="20px"
      bg="gray.200"
      
    >
      <Flex mb="10" color="black" fontWeight={800}>
        <Text textTransform="capitalize">{category ? category : 'All'}</Text>
      </Flex>

      <Flex float="right" my="-180px">
        {categories.map((cat) =>
          cat.name.toLowerCase() === category ? (
            <Image src={cat.imgURL} maxW="241px" maxH="230px" />
          ) : null
        )}
      </Flex>
      <HStack>
        <Text mt="-50px" fontWeight={200} color="gray" fontSize="20px">
          {filteredCategoryCount ? filteredCategoryCount : items ? items : 0}{' '}
          items
        </Text>
      </HStack>
    </Box>
  );
};

export default Header;
