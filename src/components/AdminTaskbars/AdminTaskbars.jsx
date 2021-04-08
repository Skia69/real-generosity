import React from 'react';
import AdminUsers from '../AdminUsers/AdminUsers';
import AdminUsersReports from '../AdminUsersReports';
import { Search } from 'react-feather';

import {
  Container,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const AdminTaskbars = ({
  allUsers,
  allItems,
  allItemsLoading,
  allRequests,
  allRequestsLoading,
}) => {
  const { t } = useTranslation();
  const currentUser = useAuth();

  return (
    <Container maxWidth="891px">
      <Tabs>
        <TabList justifyContent="space-around">
          <Tab>{t('adminPage.users')}</Tab>
          <Tab>{t('adminPage.reports')}</Tab>
        </TabList>

        <TabPanels>
          {/* Users panel  */}
          <TabPanel>
            <HStack justifyContent="space-between" marginBottom="40px">
              <Text fontSize="md" fontWeight="bold">
                {currentUser && allUsers ? allUsers.length : ''}{' '}
                {t('adminPage.users')}
              </Text>
              <Box size="100px">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Search color="gray" />}
                  />
                  <Input type="text" placeholder={t('adminPage.search')} />
                </InputGroup>
              </Box>
            </HStack>
            <SimpleGrid rows={6} gap={4}>
              {allUsers
                ? allUsers.map((user) => (
                    <AdminUsers
                      user={user}
                      allItems={allItems}
                      allItemsLoading={allItemsLoading}
                      allRequests={allRequests}
                      allRequestsLoading={allRequestsLoading}
                    />
                  ))
                : ''}
            </SimpleGrid>
          </TabPanel>

          {/* Reports panel  */}
          <TabPanel>
            <SimpleGrid columns={4} gap={4}>
              <AdminUsersReports />
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminTaskbars;
