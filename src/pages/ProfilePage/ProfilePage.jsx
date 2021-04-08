import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileTaskbars from '../../components/ProfileTaskbars';
import { useDocumentData, useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../../services/firebase';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function ProfilePage() {
  const currentUser = useAuth();
  const { uid, tab } = useParams();
  console.log(tab);
  let tabIndex = 0;
  switch (tab) {
    case 'notifications':
      tabIndex = 1;
      break;
    case 'donations':
    default:
      tabIndex = 0;
  }

  console.log(tabIndex);
 

  //query header details from firebase
  const query = firestore.collection('users').doc(uid);
  const [data, loading, error] = useDocumentData(query);

  //query donations from firebase
  const items = firestore
    .collection('items')
    .where('uid', '==', uid)
    .where('status', '==', 'active');
  const [donations, donationsLoading] = useCollection(items);

  //query notifications from firebase
  const notifications = firestore
    .collection('notifications')
    .where('targetId', '==', uid);

  const [notify, notifyLoading] = useCollection(notifications);
  console.log('notify', notify);

  if (error) console.error(error);

  if (loading) return <>loading...</>;
 

  
  const { fullname, email, phoneNumber } = data;

  return (
    <SimpleGrid maxW="1080px" mx="auto" gap={8} mt="20">
      <ProfileHeader
        fullname={fullname}
        email={email}
        phoneNumber={phoneNumber}
        uid={uid}
        currentUser={currentUser}
      />
      <ProfileTaskbars
        uid={uid}
        donations={donations}
        donationsLoading={donationsLoading}
        notify={notify}
        notifyLoading={notifyLoading}
        tabIndex={tabIndex}
      />
    </SimpleGrid>
  );
}

export default ProfilePage;
