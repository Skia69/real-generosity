import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import React from 'react';
// import { AlertCircle, ArrowLeft, MapPin } from 'react-feather';
import { ArrowLeft, MapPin } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { convertTimestamp } from '../../helpers/convertTimestamp';
import { useLocation } from '../../hooks/useLocation';
import DeleteModal from '../DeleteModal/DeleteModal';
import RequestModal from '../RequestModal';
import ContactInfoModal from '../ContactInfoModal/ContactInfoModal';
import ReportModal from '../ReportModal/ReportModal';
import { useAuth } from '../../contexts/AuthContext';
const ItemDetails = ({
  ownerInfo,
  isOwner,
  isAdmin,
  handleReport,
  reportType,
  isApprovedRequester,
  handleDelete,
  setValue,
  handleChange,
  handleRequest,
  reqCheck,
  reqCheckLoading,
  category,
  title,
  createdAt,
  description,
  location,
  image_url,
  users,
  usersLoading,
  repoCheck,
  repoCheckLoading,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const currentUser = useAuth();

  const { cityName, isLoading } = useLocation(location);
  console.log('item details city name', cityName);

  return (
    <SimpleGrid columns={2} my={15}>
      <Image boxSize="500px" objectFit={'cover'} src={image_url}></Image>
      <Flex d="column" maxW="400px" fontSize={18} px={10}>
        <Flex justify="space-between">
          <Box>
            <Button
              onClick={() => history.goBack()}
              leftIcon={<ArrowLeft size={15} />}
              variant="ghost"
            >
              {t('itemPage.back')}
            </Button>
          </Box>
          {currentUser && isApprovedRequester && ownerInfo ? (
            <ContactInfoModal ownerInfo={ownerInfo} />
          ) : (
            ''
          )}
        </Flex>

        <Badge my="20px" bg="gray.100" fontSize="md" py="1" px="5">
          {category}
        </Badge>

        <Box
          color="black"
          fontWeight="bold"
          letterSpacing="wide"
          fontSize="3xl"
        >
          {title}
        </Box>
        <Flex justify="space-between">
          <Box my="5px">
            <HStack color="gray.500">
              <MapPin />
              <Box fontSize="md" color="gray.500">
                {isLoading && 'fetching address...'}
                {cityName || 'no address has been supplied yet'}
              </Box>
            </HStack>
          </Box>
          <Box>
            <Text
              color="gray.400"
              fontSize="xs"
              my="10px"
              textTransform="uppercase"
            >
              {convertTimestamp(createdAt)}
            </Text>
          </Box>
        </Flex>
        <Box mb="5" py="10px" minH="100px">
          <Text fontSize="lg">{description}</Text>
        </Box>
        {!isOwner && !isAdmin && (
          <RequestModal
            setValue={setValue}
            handleChange={handleChange}
            handleRequest={handleRequest}
            reqCheck={reqCheck}
            reqCheckLoading={reqCheckLoading}
          />
        )}

        <Flex justify="space-between" pt={50}>
          {!isOwner && !isAdmin ? (
            <ReportModal
              handleReport={handleReport}
              reportType={reportType}
              repoCheck={repoCheck}
              repoCheckLoading={repoCheckLoading}
            />
          ) : (
            ''
          )}
          {isOwner && <DeleteModal handleDelete={handleDelete} />}
          {isAdmin && <DeleteModal handleDelete={handleDelete} />}
        </Flex>
      </Flex>
    </SimpleGrid>
  );
};

export default ItemDetails;
