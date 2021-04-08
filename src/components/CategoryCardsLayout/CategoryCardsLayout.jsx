import { Heading, HStack, Stack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import appliances from '../../assets/images/appliances.png';
import book from '../../assets/images/book.png';
import Clothes from '../../assets/images/Clothes.png';
import furniture from '../../assets/images/furniture.png';
import medicalkit from '../../assets/images/medicalkit.png';
import toys from '../../assets/images/toys.png';
import CategoryCard from '../CategoryCard';

const CATEGORIES = [
  {
    categoryPic: furniture,
    CategoryName: 'furniture',
  },
  {
    categoryPic: Clothes,
    CategoryName: 'clothes',
  },
  {
    categoryPic: book,
    CategoryName: 'books',
  },
  {
    categoryPic: toys,
    CategoryName: 'toys',
  },
  {
    categoryPic: medicalkit,
    CategoryName: 'medics',
  },
  {
    categoryPic: appliances,
    CategoryName: 'appliances',
  },
];

const CategoryCardsLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack w="7xl">
      <Heading size="lg" color="green.500" mb={5} fontWeight={'semibold'}>
        {t('categoryCards.header')}
      </Heading>

      <HStack spacing={6} wrap="wrap">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard
            mt={i % 2 ? '12' : null}
            categoryPic={cat.categoryPic}
            categoryName={t(`categoryCards.${cat.CategoryName}`)}
            categoryLink={`/items/${cat.CategoryName}`}
          ></CategoryCard>
        ))}
      </HStack>
    </Stack>
  );
};

export default CategoryCardsLayout;
