import React from 'react';
import { Heading, Button, Flex, Stack, Image, Box } from '@chakra-ui/react';
import heroSectionImage_1 from '../../assets/images/heroSectionImage_1.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      px={['8', '8', '0', '0']}
      maxW="7xl"
      mx="auto"
    >
      <Stack
        w={{ base: '80%', md: '50%' }}
        align={['center', 'center', 'flex-start', 'flex-start']}
        spacing={['4', '4', '14', '14']}
      >
        <Heading
          textAlign={['center', 'center', 'left', 'left']}
          color="black"
          fontSize={['2xl', '3xl', '4xl', '4xl']}
          fontWeight="medium"
        >
          {t('heroSection.heroText_1')}
          <font color="#38A169">
            <b>{t('heroSection.heroText_2')}</b>
          </font>
          <br />
          {t('heroSection.heroText_3')}
          <font color="#38A169">
            <b> {t('heroSection.heroText_4')} </b>
          </font>
          {t('heroSection.heroText_5')}
        </Heading>

        <Heading
          opacity="0.8"
          lineHeight={1.5}
          textAlign={['center', 'center', 'left', 'left']}
          fontSize={['md', 'md', 'xl', 'xl']}
          fontWeight="medium"
          textColor="gray.500"
        >
          {t('heroSection.paragraph_1')}
          <br />
          {t('heroSection.paragraph_2')}
        </Heading>

        <Link to="/add-item">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              colorScheme="green"
              py={['4', '4', '8', '8']}
              px={['10', '10', '20', '20']}
              fontSize={['md', 'md', '2xl', '2xl']}
            >
              {t('heroSection.donateButton')}
            </Button>
          </motion.button>
        </Link>
      </Stack>
      <Box w={{ base: '80%', sm: '60%', md: '60%' }} mb={{ base: 12, md: 0 }}>
        <Image size="100%" src={heroSectionImage_1} loading="eager" />
      </Box>
    </Flex>
  );
};
export default HeroSection;
