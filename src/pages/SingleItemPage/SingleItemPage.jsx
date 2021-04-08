import {
  Box,
  Container,
  GridItem,
  SimpleGrid,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
// import Carouselimg from '../../components/Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams, useHistory } from 'react-router-dom';
import ItemDetails from '../../components/ItemDetails';
import ItemRequests from '../../components/ItemRequests';
import ItemReports from '../../components/ItemReports/Itemreports';
import { useAuth } from '../../contexts/AuthContext';
import firebase, { firestore } from '../../services/firebase';
import { Link } from 'react-router-dom';

const SingleItemPage = () => {
  const { t } = useTranslation();
  const { id, tab } = useParams();
  const currentUser = useAuth();
  const history = useHistory();

  let tabIndex = 0;
  
  switch (tab) {
    case 'requests':
      tabIndex = 1;
      break;
    case 'reports':
      tabIndex = 1;
      break;
    case 'details':
    default:
      tabIndex = 0;
  }

  // query item details
  const query = firestore.collection('items').doc(id);
  const [item, loading, error] = useDocumentData(query);

  //query item requests
  const requestsRef = firestore.collection('requests');
  const reqQuery = requestsRef.where('itemId', '==', id);
  const [requests, reqLoading] = useCollectionData(reqQuery);

  console.log('requests', requests);

  // requestModal functions and states
  const [value, setValue] = React.useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleRequest = () => {
    //add request doc to requests
    firestore
      .collection('requests')
      .add({
        requester: currentUser.uid,
        status: 'pending',
        itemId: id,
        reason: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        //add notification doc to notifications targeted to the requestee
        firestore.collection('notifications').add({
          targetId: item.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          itemId: id,
          type: 'request',
          seen: false,
        });
      });
  };

  // delete item function
  const updateStatus = async () => {
    //update item status
    await firestore.collection('items').doc(id).set(
      {
        status: 'deleted',
      },
      { merge: true }
    );
  };
  const handleDelete = () => {
    updateStatus();
    history.goBack();
  };

  //check for request with requester=currentuser to disable request Btn
  let checkingUserRequest;
  if (currentUser)
    checkingUserRequest = firestore
      .collection('requests')
      .where('itemId', '==', id)
      .where('requester', '==', currentUser.uid);
  const [reqCheck, reqCheckLoading] = useCollectionData(checkingUserRequest);

  //check if exist an approve notification for this item
  let checkingApproval;
  if (currentUser)
    checkingApproval = firestore
      .collection('notifications')
      .where('itemId', '==', id)
      .where('type', '==', 'approve');
  const [checkApproval, checkApprovalLoading] = useCollectionData(
    checkingApproval
  );
  console.log('checkapproval', checkApproval);

  //check approveid
  // let checkingApprovalId ;
  // if (currentUser)
  // checkingApprovalId = firestore
  //    .collection('notifications')
  //    .where('itemId','==',id)
  //    .where('type','==','approve');
  //   const [checkApprovalId,checkApprovalIdLoading]=useCollection(checkingApprovalId)
  //   console.log("checkapprovalId",checkApprovalId)

  //query all users
  const usersCollection = firestore.collection('users');
  const [users, usersLoading] = useCollectionData(usersCollection);

  //query owner info of this item to display for approved requester
  const ownerInfo = users?.find((user) => user?.uid === item?.uid);
  console.log('owner', ownerInfo);
  //handleReport function
  const reportType = React.useRef('');
  const handleReport = () => {
    //add report doc to reports
    firestore
      .collection('reports')
      .add({
        reporter: currentUser.uid,
        itemId: id,
        reason: reportType.current.value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        //add notification doc to notifications targeted to the admin
        firestore.collection('notifications').add({
          targetId: 'ng0Qsdz9OubnnqMvdvpJ58CnX3z2',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          itemId: id,
          type: 'report',
          seen: false,
        });
      });
  };
  //check for report with reporter=currentuser to disable report Btn
  let checkReports;
  if (currentUser)
    checkReports = firestore
      .collection('reports')
      .where('itemId', '==', id)
      .where('reporter', '==', currentUser.uid);
  const [repoCheck, repoCheckLoading] = useCollectionData(checkReports);
  console.log('repo', repoCheck);

  // query reports
  const reportsRef = firestore.collection('reports');
  const repQuery = reportsRef.where('itemId', '==', id);
  const [reports, reportsLoading] = useCollectionData(repQuery);

  console.log('reports', reports);

  //check if the user isOwner of the item
  const isOwner = item && item?.uid === currentUser?.uid;

  //check if the user is Admin
  let user;
  if (currentUser) user = firestore.collection('users').doc(currentUser.uid);
  const [userData, userDataLoading] = useDocumentData(user);
  console.log(userDataLoading);
  const isAdmin = currentUser && userData?.role === 'admin';

  //check requester isApprovedRequester to display the item owner contact info
  const isApprovedRequester =
    checkApproval && currentUser?.uid === checkApproval[0]?.targetId;

  if (error) return 'an error has occured...';

  if (loading) {
    return (
      <Container maxW="1080px" minH="600px" mx="auto" my={24}>
        <SimpleGrid columns={2}>
          <Skeleton boxSize="500px" />
          <GridItem placeSelf={'center'}>loading details...</GridItem>
        </SimpleGrid>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" minH="500px" mx="auto" my={20}>
      <Box px={10}>
        {isOwner && (
          <Tabs variant="soft-rounded" colorScheme="gray" index={tabIndex}>
            <TabList>
              <Tab>
              <Link to={`/item/${id}/details`}>
                {t('itemPage.details')}
                </Link>
              </Tab>
              <Tab>
              <Link to={`/item/${id}/requests`}>
                {t('itemPage.requests')}
                </Link>
                </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ItemDetails
                  isOwner={isOwner}
                  {...item}
                  handleDelete={handleDelete}
                  setValue={setValue}
                  handleChange={handleChange}
                  handleRequest={handleRequest}
                  reqCheck={reqCheck}
                  reqCheckLoading={reqCheckLoading}
                />
              </TabPanel>
              <TabPanel>
                {reqLoading && 'is loading...'}
                {requests && (
                  <ItemRequests
                    requests={requests}
                    users={users}
                    id={id}
                    checkApproval={checkApproval}
                    checkApprovalLoading={checkApprovalLoading}
                  />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}

        {!isOwner && !isAdmin && (
          <ItemDetails
            {...item}
            setValue={setValue}
            handleChange={handleChange}
            handleRequest={handleRequest}
            handleDelete={handleDelete}
            reqCheck={reqCheck}
            reqCheckLoading={reqCheckLoading}
            isApprovedRequester={isApprovedRequester}
            reportType={reportType}
            handleReport={handleReport}
            repoCheck={repoCheck}
            repoCheckLoading={repoCheckLoading}
            users={users}
            usersLoading={usersLoading}
            ownerInfo={ownerInfo}
          />
        )}

        {isAdmin && (
          <Tabs variant="soft-rounded" colorScheme="gray" index={tabIndex}> 
            <TabList>
              <Tab>
                <Link to={`/item/${id}/details`}>
                {t('itemPage.details')}
                </Link>
              </Tab>
              <Tab>
              <Link to={`/item/${id}/reports`}>
                {t('itemPage.reports')}
                </Link>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ItemDetails
                  {...item}
                  handleDelete={handleDelete}
                  isAdmin={isAdmin}
                  reportType={reportType}
                  handleReport={handleReport}
                />
              </TabPanel>
              <TabPanel>
                {reportsLoading && <>loading</>}
                {reports && (
                  <ItemReports
                    reports={reports}
                    handleDelete={handleDelete}
                    users={users}
                    usersLoading={usersLoading}
                  />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}

        {/* <Box> */}
        {/* <ItemsMap /> */}
        {/* </Box>  */}
      </Box>
    </Container>
  );
};

export default SingleItemPage;
