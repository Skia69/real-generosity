import React from 'react';
import {
  Box,
  VStack,
  Image,
  SimpleGrid,
  Heading,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
} from '@chakra-ui/react';
import idcard from '../../assets/images/idcard.jpg';
import security from '../../assets/images/security.jpg';
import laptophand from '../../assets/images/laptophand.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <Box maxW="1080px" minH="500px" m="auto">
      <Box m="auto">
        <Heading as="h1" py="20px" size="lg">
          {t('aboutUs.aboutUs')}
        </Heading>
      </Box>
      <Box>
        <Tabs>
          <TabList justifyContent="space-around">
            <Tab>{t('aboutUs.tab1')}</Tab>
            <Tab>{t('aboutUs.tab2')}</Tab>
            <Tab>{t('aboutUs.tab3')}</Tab>
            <Tab>{t('aboutUs.tab4')}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={2} spacing={10} m="auto">
                <Box>
                  <Heading as="h2" size="md" py="20px">
                    {t('aboutUs.tab1heading1')}{' '}
                  </Heading>
                  <Text>{t('aboutUs.tab1p1')}</Text>
                  <Text>{t('aboutUs.tab1p2')}</Text>
                  <Text>{t('aboutUs.tab1p3')}</Text>
                  <Heading as="h1" size="sx" py="20px">
                    {t('aboutUs.tab1heading2')}{' '}
                  </Heading>
                </Box>
                <Box m="auto">
                  <Image src="https://i.pinimg.com/474x/bc/f2/4f/bcf24f3af41a044065b7c676cf2cfc37.jpg"></Image>
                </Box>
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <Box>
                <SimpleGrid columns={3} spacing={10}>
                  <Box>
                    <VStack>
                      <Image
                        boxSize="200px"
                        src="https://media.istockphoto.com/vectors/hands-heart-one-line-vector-id1136858654?k=6&m=1136858654&s=612x612&w=0&h=TkFMsZSnWH-nAw6En-VN4mGYgrn_jBL4qzLuVJg8JlA="
                      ></Image>
                      <Heading size="md">{t('aboutUs.v1')}</Heading>
                      <Text align="center" px="15px" py="10px">
                        {t('aboutUs.v1p')}
                      </Text>
                    </VStack>
                  </Box>
                  <Box>
                    <VStack>
                      <Image
                        boxSize="200px"
                        src="https://media.istockphoto.com/vectors/hands-heart-one-line-vector-id1136858654?k=6&m=1136858654&s=612x612&w=0&h=TkFMsZSnWH-nAw6En-VN4mGYgrn_jBL4qzLuVJg8JlA="
                      ></Image>
                      <Heading size="md">{t('aboutUs.v2')}</Heading>
                      <Text align="center" px="15px" py="10px">
                        {t('aboutUs.v2p')}
                      </Text>
                    </VStack>
                  </Box>
                  <Box>
                    <VStack>
                      <Image
                        boxSize="200px"
                        src="https://media.istockphoto.com/vectors/hands-heart-one-line-vector-id1136858654?k=6&m=1136858654&s=612x612&w=0&h=TkFMsZSnWH-nAw6En-VN4mGYgrn_jBL4qzLuVJg8JlA="
                      ></Image>
                      <Heading size="md">{t('aboutUs.v3')}</Heading>
                      <Text align="center" px="15px" py="10px">
                        {t('aboutUs.v3p')}
                      </Text>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <SimpleGrid columns={3} spacing={10}>
                  <Box>
                    <VStack>
                      <Image boxSize="200px" src={laptophand}></Image>
                      <Heading size="md" color="#00D285">
                        {t('aboutUs.step1')}
                      </Heading>
                      <Heading size="md">{t('aboutUs.step1H')}</Heading>
                      <Text align="center" px="15px" py="10px">
                        {t('aboutUs.step1p')}
                      </Text>
                    </VStack>
                  </Box>
                  <Box>
                    <VStack>
                      <Image boxSize="200px" src={idcard}></Image>
                      <Heading size="md" color="#00D285">
                        {t('aboutUs.step2')}
                      </Heading>
                      <Heading size="md">{t('aboutUs.step2H')}</Heading>
                      <Text align="center" px="15px" py="10px">
                        {t('aboutUs.step2p')}{' '}
                      </Text>
                    </VStack>
                  </Box>
                  <Box>
                    <VStack>
                      <Image
                        boxSize="200px"
                        src="https://i.pinimg.com/474x/63/98/89/63988930bde2ed562ac283a05d02053c.jpg"
                      ></Image>
                      <Heading size="md" color="#00D285">
                        {t('aboutUs.step3')}
                      </Heading>
                      <Heading size="md">{t('aboutUs.step3H')}</Heading>
                      <Text align="center" px="15px" py="10px">
                        {t('aboutUs.step3p')}
                      </Text>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </Box>
            </TabPanel>
            <TabPanel>
              <Flex justify="space-between">
                <Box>
                  <Heading as="h2" size="md" py="20px">
                    {' '}
                    {t('aboutUs.tab4heading')}{' '}
                  </Heading>
                  <Box py="15px">
                    <Heading size="sx"> {t('aboutUs.q1')} </Heading>
                    <Text fontSize="sx"> {t('aboutUs.a1')} </Text>
                  </Box>
                  <Box py="15px">
                    <Heading size="sx"> {t('aboutUs.q2')} </Heading>
                    <Text>{t('aboutUs.a2')} </Text>
                  </Box>
                  <Box py="15px">
                    <Heading size="sx"> {t('aboutUs.q3')} </Heading>
                    <Text>{t('aboutUs.a3')} </Text>
                  </Box>
                  <Text pt="20px">
                    {' '}
                    {t('aboutUs.tab3p')}{' '}
                    <Link to="/contactus">
                      {' '}
                      <Text color="#3182CE" as="ins">
                        {t('aboutUs.here')}.
                      </Text>
                    </Link>{' '}
                  </Text>
                </Box>
                <Box m="auto">
                  <Image boxSize="200px" src={security}></Image>
                </Box>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default AboutUs;
