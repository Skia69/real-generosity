import React from 'react';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
// import { useTranslation } from 'react-i18next';
import DeleteModal from '../DeleteModal/DeleteModal';
import { convertTimestamp } from '../../helpers/convertTimestamp';

const ItemReports = ({ reports, handleDelete, users, usersLoading }) => {
  // const { t } = useTranslation();

  const reportoptions = [
    { option: 'option1', value: 'inappropriate content' },
    { option: 'option2', value: 'false identity to decieve people' },
    { option: 'option3', value: 'scam' },
  ];

  if (usersLoading) return <>loading...</>;
  return (
    <Flex d="column" fontSize={18}>
      <Flex justify="space-between">
        <Box py={5}>
          <Text fontWeight="bold" fontSize={18}>
            Number of Reports: {reports.length}
          </Text>
        </Box>
        <Box ml={80} my={5} alignItems="flex-end">
          <DeleteModal handleDelete={handleDelete} />
        </Box>
      </Flex>
      {reportoptions.map((reportoption) => {
        return (
          <Box>
            <Accordion allowToggle>
              <AccordionItem py={5}>
                <Heading size="lg">
                  <AccordionButton>
                    <Text
                      px="10px"
                      py="6px"
                      bg="gray.100"
                      borderRadius="100%"
                      mr="5px"
                    >
                      {
                        reports.filter((repo) => {
                          return repo.reason === reportoption.value;
                        }).length
                      }
                    </Text>

                    <Box flex="1" textAlign="left">
                      <Text fontSize="lg" fontWeight="semibold" as="h3">
                        {reportoption.value}
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel pb={4}>
                  {reports
                    .filter((repo) => {
                      return repo.reason === reportoption.value;
                    })
                    .map((rep) => {
                      return (
                        <Flex d="column">
                          <Box mb={4} bg={'green.400'}>
                            <Flex align="center" justify="space-between" px={7}>
                              <Text fontSize="lg" fontWeight="semibold" as="h3">
                                {users &&
                                  users.find(
                                    (user) => user.uid === rep.reporter
                                  )?.fullname}
                              </Text>
                              <Text fontSize="lg" fontWeight="semibold" as="h3">
                                {users &&
                                  users.find(
                                    (user) => user.uid === rep.reporter
                                  )?.email}
                              </Text>
                              <Text
                                color="gray.100"
                                fontSize="lg"
                                my="5px"
                                textTransform="uppercase"
                              >
                                {convertTimestamp(rep.createdAt)}
                              </Text>
                            </Flex>
                          </Box>
                        </Flex>
                      );
                    })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        );
      })}
    </Flex>
  );
};

export default ItemReports;
