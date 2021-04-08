import {
  Box,
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'react-feather';
import Card from '../Card';
import { useTranslation } from 'react-i18next';
import ProfileNotificationsTab from '../ProfileNotificationsTab/ProfileNotificationsTab';

const ProfileTaskbars = ({
  uid,
  donations,
  donationsLoading,
  notify,
  notifyLoading,
  tabIndex = 0,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Tabs index={tabIndex}>
        <TabList justifyContent="space-around">
         <Tab><Link to={`/profile/${uid}/donations`}>
          {t('profilePage.donations')}</Link> </Tab>
        <Tab>  
          <Link to={`/profile/${uid}/notifications`}>
          {t('profilePage.notifications')}
          </Link> 
          </Tab>
          
        </TabList>

        <TabPanels>
          {/* Donations panel  */}
          <TabPanel>
            <HStack>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search color="gray" />}
                />
                <Input type="text" placeholder="Search" />
              </InputGroup>
              <Link to="/add-item">
                <Button color="white" bg="green.400">
                  <Plus />
                  Submit Donation
                </Button>
              </Link>
            </HStack>

            <SimpleGrid columns={4} gap={4}>
              {donationsLoading && 'loading ...'}
              {donations &&
                donations.docs.map((item) => {
                  return <Card key={item.id} id={item.id} {...item.data()} />;
                })}
            </SimpleGrid>
          </TabPanel>
          {/* Requests panel  */}
          <TabPanel>
            <ProfileNotificationsTab
              notify={notify}
              notifyLoading={notifyLoading}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default ProfileTaskbars;
