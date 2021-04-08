import React from 'react';
import { Box, Stack, Flex, HStack, Text } from '@chakra-ui/react';
import { Facebook, Instagram, GitHub, Twitter } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const Footer = (props) => {
  const { t } = useTranslation();

  return (
    <Flex
      py="10"
      as="footer"
      justify="space-between"
      fontSize={['xx-small', 'xs', 'sm', 'xl']}
      fontWeight={600}
      width="100%"
      direction="column"
      maxW="1200px"
      {...props}
      mx="auto"
    >
      <Box mb="10" w="full" h="2px" bg="gray.200"></Box>
      <HStack
        mb="10"
        justify="space-between"
        color="gray.500"
        _hover={{ cursor: 'pointer' }}
        align="center"
        px={['10', '48', '52', '72']}
      >
        <Stack spacing="8" align="center">
          <Link to="/">
            <Text _hover={{ color: 'green.400' }}>{t('navbar.home')}</Text>
          </Link>
          <Box color="gray.500" fontSize="xs" _hover={{ color: 'green.400' }}>
            <a href="http://www.facebook.com">
              <Facebook />
            </a>
          </Box>
        </Stack>

        <Stack spacing="8" align="center">
          <Link to="/items">
            <Text _hover={{ color: 'green.400' }}>{t('navbar.items')}</Text>
          </Link>
          <Box color="gray.500" fontSize="xs" _hover={{ color: 'green.400' }}>
            <a href="http://www.instagram.com">
              <Instagram />
            </a>
          </Box>
        </Stack>

        <Stack spacing="8" align="center">
          <Link to="/about">
            <Text _hover={{ color: 'green.400' }}>{t('navbar.about')}</Text>
          </Link>
          <Box color="gray.500" fontSize="xl" _hover={{ color: 'green.400' }}>
            <a href="http://www.github.com">
              <GitHub />
            </a>
          </Box>
        </Stack>

        <Stack spacing="8" align="center">
          <Link to="/contactus">
            <Text _hover={{ color: 'green.400' }}>{t('navbar.contactUs')}</Text>
          </Link>
          <Box color="gray.500" fontSize="sm" _hover={{ color: 'green.400' }}>
            <a href="http://www.twitter.com">
              <Twitter />
            </a>
          </Box>
        </Stack>
      </HStack>
    </Flex>
  );
};

export default Footer;
