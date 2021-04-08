import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import HeroSection from '../../components/HeroSection';
import CategoryCardLayout from '../../components/CategoryCardsLayout';
import CardList from '../../components/CardList';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../../services/firebase';

function HomePage() {
  const query = firestore
    .collection('items')
    .where('status', '==', 'active')
    .orderBy('createdAt', 'desc')
    .limit(5);
  const [items, loading, error] = useCollectionOnce(query);

  if (error) return 'an error has occured...';

  return (
    <Grid gap={40}>
      <HeroSection />

      <Box mx="auto">
        <CategoryCardLayout />
      </Box>

      <Box mb="24" mx="auto">
        {loading && 'items list is loading...'}
        {items && <CardList items={items.docs} />}
      </Box>
    </Grid>
  );
}

export default HomePage;
