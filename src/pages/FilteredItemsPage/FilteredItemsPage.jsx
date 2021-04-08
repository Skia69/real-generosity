import { Box, Container, Flex, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import Filters from '../../components/Filters';
import Header from '../../components/Header';
import ItemsList from '../../components/ItemsList';
import ItemsMap from '../../components/ItemsMap/ItemsMap';
import { firestore } from '../../services/firebase';

const FilteredItemsPage = () => {
  const { category } = useParams();
  const [search, setSearch] = React.useState('');

  let itemsRef = firestore
    .collection('items')
    // TODO: uncomment after fixing old items
    // .where('status', '==','active')
    .where('category', '==', category)
    .orderBy('createdAt', 'desc');

  if (search) {
    itemsRef = itemsRef.where('title', '==', search);
  }

  const [items, loading, error] = useCollection(itemsRef);

  const renders = React.useRef(0);
  console.log('FilteredItemsPage.jsx render... ', renders.current++);

  if (error) {
    console.log('error', error);
    return 'an error has occured...';
  }

  if (loading)
    return (
      <Container centerContent minH="100vh">
        <Skeleton w={1080} my={50} h={200} />
        <Skeleton w={1080} mb={50} h={50} />
        <Flex>
          <Skeleton mr={30} w={500} h="80vh" />
          <Skeleton w={500} h="80vh" />
        </Flex>
      </Container>
    );

  return (
    <Container my="45px" maxW="1080px">
      <Box mb="45px">
        <Header filteredCategoryCount={items.docs.length} />
      </Box>

      <Box mb="45px">
        <Filters setSearch={setSearch} />
      </Box>

      <Flex justify="space-between">
        <Box w="50%">
          {items.docs.length ? (
            <ItemsList items={items.docs} />
          ) : (
            'no match found...'
          )}
        </Box>
        <Box w="50%" ml={30}>
          <ItemsMap items={items.docs} />
        </Box>
      </Flex>
    </Container>
  );
};

export default FilteredItemsPage;
