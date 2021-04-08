import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ArrowRight } from 'react-feather';
import { Link } from 'react-router-dom';

const CategoryCard = ({ mt, categoryPic, categoryName, categoryLink }) => {
  return (
    <Link to={categoryLink}>
      <VStack
        spacing="4"
        mt={mt}
        bg="white"
        align="center"
        borderRadius="md"
        w="48"
        p="6"
        boxShadow="md"
      >
        <Image color="gray.100" objectFit="cover" src={categoryPic} w="24" />

        <Text fontSize="lg" fontWeight="semibold">
          {categoryName}
        </Text>
        <Flex justify="center" align="center" borderRadius="lg">
          <ArrowRight />
        </Flex>
      </VStack>
    </Link>
  );
};

export default CategoryCard;
