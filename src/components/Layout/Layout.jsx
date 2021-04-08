import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import Footer from '../Footer';
import NavBar from '../NavBar';

function Layout({ children }) {
  return (
    <Flex minH="100vh" bg="gray.50" direction="column" justify="space-between">
      <NavBar />
      <Box mt={16} flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

export default Layout;
