import { Heading, Button, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Phone, Mail, User } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProfileHeader = ({ fullname, email, phoneNumber, uid }) => {
  const { t } = useTranslation();

  return (
    <Grid>
      <HStack spacing="25px" marginBottom="10px">
        <HStack>
          <User />
          <Heading as="h1" size="lg">
            {fullname}
          </Heading>
        </HStack>
        <Link to={`/profile/${uid}/edit/info`}> 
          <Button
            rounded="5px"
            size="xs"
            fontSize="xs"
            borderRadius="1px"
            background="white"
            color="black"
            borderColor="black"
            variant="outline"
          >
            {t('profilePage.editProfile')}
          </Button>
        </Link>
      </HStack>
      <VStack align="right">
        <HStack my={3}>
          <Mail />
          <Text fontSize="md" fontWeight="medium">
            {email}
          </Text>
        </HStack>
        <HStack my={3}>
          <Phone />
          <Text fontSize="md" fontWeight="medium">
            {phoneNumber}
          </Text>
        </HStack>
      </VStack>
    </Grid>
  );
};
export default ProfileHeader;
