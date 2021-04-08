import React from 'react';
import {
  HStack,
  Avatar,
  VStack,
  Box,
  Heading,
  StatDownArrow,
} from '@chakra-ui/react';
import { MapPin } from 'react-feather';

const AdminUsersReports = () => {
  return (
    <HStack mx="auto" spacing="600px" justifyContent="space-between">
      <HStack spacing="20px">
        <Avatar
          size="lg"
          name="Kent Dodds"
          src="https://bit.ly/kent-c-dodds"
        ></Avatar>
        <VStack>
          <Heading fontSize="sm">User Name</Heading>
          <HStack color="gray.500">
            <MapPin size="14" />
            <Box fontSize="12x">Location</Box>
          </HStack>
        </VStack>
      </HStack>
      <StatDownArrow />
    </HStack>
  );
};

export default AdminUsersReports;
