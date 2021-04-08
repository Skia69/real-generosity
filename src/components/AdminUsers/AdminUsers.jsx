import React from 'react';
import { HStack, Avatar, VStack, Heading, Box, Button } from '@chakra-ui/react';
import { MapPin, Heart, ShoppingCart } from 'react-feather';
import { useTranslation } from 'react-i18next';

const AdminUsers = ({ user, items, requests }) => {
  const { t } = useTranslation();
  return (
    <Box maxWidth="1080px">
      <HStack mx="auto" spacing="125px" justifyContent="space-between">
        <HStack spacing="20px">
          <Avatar
            size="lg"
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
          ></Avatar>
          <VStack>
            <Heading fontSize="sm">{user.fullname}</Heading>
            <HStack color="gray.500">
              <MapPin size="14" />
              <Box fontSize="12x"></Box>
            </HStack>
          </VStack>
        </HStack>
        <VStack>
          <Heart size="14" />
          <Box fontSize="12px">
            {/* {items.filter(item=>item.uid===user.uid).length}  */}
            {t('adminPage.donations')}
          </Box>
        </VStack>
        <VStack>
          <ShoppingCart size="14" />
          <Box fontSize="12px">
            {/* {requests.filter(request=>request.requester===user.uid).length} */}
            {t('adminPage.requests')}
          </Box>
        </VStack>

        <Button colorScheme="red" variant="outline">
          approve
        </Button>
      </HStack>
    </Box>
  );
};

export default AdminUsers;
