import React from 'react';
import { useTranslation } from 'react-i18next';
import { convertTimestamp } from '../../helpers/convertTimestamp';
import ContactInfoModal from '../ContactInfoModal/ContactInfoModal';
import firebase, { firestore } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Text,
  Container,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const ItemRequests = ({
  requests,
  id,
  checkApprovalLoading,
  checkApproval,
  users,
}) => {
  const [approveNotificationId, setApproveNotificationId] = React.useState('');
  console.log('approveNotificationId', approveNotificationId.id);
  const { t } = useTranslation();
  const currentUser = useAuth();
  const history = useHistory();

  // handleDelivered function to delete an item once its delivered
  const updateStatus = async () => {
    //update item status
    await firestore.collection('items').doc(id).set(
      {
        status: 'deleted',
      },
      { merge: true }
    );
  };
  const handleDelivered = () => {
    updateStatus();
    history.goBack();
  };

  // handleApprove send a notification for requester once its approved
  const notificationsRef = firestore.collection('notifications');
  const handleApprove = async (requester) => {
    //insert a new document in firestore notifications collection
    await notificationsRef
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        targetId: requester,
        itemId: id,
        seen: false,
        type: 'approve',
      })
      .then((docRef) => setApproveNotificationId(docRef));
  };

  // handleDecline update  the type of a notification
  const updateType = async () => {
    //update notification type
    await firestore
      .collection('notifications')
      .doc(approveNotificationId.id)
      .set(
        {
          type: 'decline',
        },
        { merge: true }
      );
  };
  const handleDecline = () => {
    updateType();
    console.log('decline');
  };

  if (checkApprovalLoading) return <>loading</>;
  return (
    <Container maxW="7xl" mx="auto">
      {requests && requests.length === 0 ? (
        <Box
          m="auto"
          color="black"
          fontWeight="bold"
          letterSpacing="wide"
          fontSize="3xl"
        >
          No Requests Yet
        </Box>
      ) : (
        <Table variant="simple">
          <TableCaption>
            <Button
              colorScheme="green"
              w="100%"
              size="lg"
              onClick={handleDelivered}
            >
              {t('itemPage.delivered')}
            </Button>
          </TableCaption>
          <Thead>
            <Tr>
              <Th> {t('itemPage.reason')}</Th>
              <Th>{t('itemPage.createdAt')}</Th>
              <Th>{t('itemPage.approve')} </Th>
              <Th>{t('itemPage.requesterInfo')}</Th>
            </Tr>
          </Thead>
          <Tbody overflow="auto">
            {requests.map((request, index) => (
              <Tr>
                <Td>
                  <Accordion allowToggle maxW="200px">
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            flex="1"
                            textAlign="left"
                            overflow="hidden"
                            maxW="250px"
                          >
                            <Text isTruncated> {request.reason} </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}> {request.reason} </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Td>
                <Td>{convertTimestamp(request.createdAt)}</Td>
                <Td>
                  <Button
                    fontSize="xs"
                    disabled={
                      currentUser && checkApproval.length === 0 ? false : true
                    }
                    onClick={() => handleApprove(request.requester)}
                  >
                    {/* {t('itemPage.approve')} */}
                    approve
                  </Button>
                </Td>
                <Td>
                  {checkApproval &&
                  users &&
                  checkApproval.find(
                    (check) => check.targetId === request.requester
                  ) ? (
                    <HStack>
                      <Button onClick={() => handleDecline()}>decline</Button>
                      <ContactInfoModal
                        users={users}
                        requesterid={request.requester}
                      />
                      )
                    </HStack>
                  ) : (
                    ''
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
};

export default ItemRequests;
