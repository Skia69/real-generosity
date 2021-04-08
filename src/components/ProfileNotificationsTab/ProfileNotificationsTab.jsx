import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Container,
  HStack,
  Text,
} from '@chakra-ui/react';
import { ShoppingBag, CheckCircle } from 'react-feather';
import { convertTimestamp } from '../../helpers/convertTimestamp';
import { Link } from 'react-router-dom';
import { firestore } from '../../services/firebase';

const ProfileNotificationsTab = ({ notify, notifyloading }) => {
  const handleSeenClick = async (id) => {
    await firestore.collection('notifications').doc(id).set(
      {
        seen: true,
      },
      { merge: true }
    );
  };

  if (notifyloading) return <>loading...</>;
  return (
    <Container maxW="7xl" mx="auto">
      <Table variant="simple">
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>type</Th>
            <Th>date</Th>
            <Th>status</Th>
            <Th>link to notified item</Th>
          </Tr>
        </Thead>
        <Tbody overflow="auto">
          {notify ? (
            notify.docs.map((notification) => (
              <Tr key={notification.id}>
                <Td>
                  <HStack>
                    {notification.data().type === 'request' && <ShoppingBag />}
                    {notification.data().type === 'approve' && <CheckCircle />}
                    <Text>{notification.data().type}</Text>
                  </HStack>
                </Td>
                <Td>{convertTimestamp(notification.data().createdAt)}</Td>
                <Td>{notification.data().seen ? 'seen' : 'unseen'}</Td>
                <Td>
                  <Link to={`/item/${notification.data().itemId}`}>
                    <Text
                      as="u"
                      onClick={handleSeenClick(notification.id)}
                      color="blue"
                    >
                      link to item{' '}
                    </Text>
                  </Link>
                </Td>
              </Tr>
            ))
          ) : (
            <>you don't have notifications</>
          )}
        </Tbody>
      </Table>
    </Container>
  );
};

export default ProfileNotificationsTab;
