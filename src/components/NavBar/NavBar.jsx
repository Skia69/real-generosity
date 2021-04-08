import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import {
  Menu,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Flex,
  HStack,
  Text,
  Icon,
  Button,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { AlignLeft, Globe, Plus } from 'react-feather';
import GetStartedBtn from '../GetStartedBtn/GetStartedBtn';
import { auth } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../services/firebase';
import logo2 from '../../assets/images/logo2.png';

//menu items
const MenuItems = ({ children, to = '/', ...rest }) => {
  return (
    <Text
      mx={{ base: 0, sm: 8 }}
      color={['Black', 'Black', 'gray.500', 'gray.500']}
      fontWeight="medium"
      {...rest}
    >
      <Link to={to} _hover={{ color: 'green.400' }}>
        {children}
      </Link>
    </Text>
  );
};

function NavBar(props) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('EN');
  const user = useAuth();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  //check if the user is Admin
  let currentUser;
  if (user) currentUser = firestore.collection('users').doc(user.uid);
  const [userData, userDataLoading] = useDocumentData(currentUser);
  console.log(userDataLoading);
  const isAdmin = user && userData?.role === 'admin';
  console.log('admin', isAdmin);

  //logout function
  const logOut = async () => {
    try {
      await auth.signOut();
      history.push('/auth/signin');
    } catch (error) {
      console.log('an error has occured...', error);
    }
  };

  //query notifications from firebase
  let notifications;
  if (user)
    notifications = firestore
      .collection('notifications')
      .where('targetId', '==', user.uid)
      .where('seen', '==', false);

  const [notify, notifyloading, notifyerror] = useCollection(notifications);
  console.log('notify', notify);
  if (notifyerror) console.log('error');
  if (notifyloading) return <>loading...</>;

  return (
    <Flex
      pos="absolute"
      mx="auto"
      w="100%"
      px={['0', '4', '8', '14']}
      pt={2}
      pb={['0', '8', '0', '0']}
      flexWrap="wrap"
      justify="space-between"
      align="center"
      fontSize={['lg', 'lg', 'md', 'lg']}
      fontWeight="medium"
      {...props}
    >
      <Box display={{ base: 'block', md: 'none' }} onClick={onOpen}>
        <Button p={2} borderRadius="md">
          <AlignLeft ref={btnRef} colorScheme="teal" onClick={onOpen} />
        </Button>
      </Box>

      <Image
        borderRadius="full"
        boxSize={{ base: '16', md: '24' }}
        src={logo2}
        alt="logo"
      />

      <Box display={{ base: 'none', md: 'block' }}>
        <Flex
          align="center"
          justify="space-between"
          _hover={{ cursor: 'pointer' }}
        >
          <MenuItems to="/" _hover={{ color: 'green.400' }}>
            {t('navbar.home')}
          </MenuItems>
          <MenuItems to="/items" _hover={{ color: 'green.400' }}>
            {t('navbar.items')}{' '}
          </MenuItems>
          <MenuItems to="/about" _hover={{ color: 'green.400' }}>
            {t('navbar.about')}{' '}
          </MenuItems>
          <MenuItems to="/contactus" _hover={{ color: 'green.400' }}>
            {t('navbar.contactUs')}{' '}
          </MenuItems>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Flex
            align="center"
            justify="space-between"
            direction="column"
            _hover={{ cursor: 'pointer' }}
            minH="50vh"
            py="14"
          >
            <MenuItems to="/" _hover={{ color: 'green.400' }}>
              {t('navbar.home')}
            </MenuItems>
            <MenuItems to="/items" _hover={{ color: 'green.400' }}>
              {t('navbar.items')}{' '}
            </MenuItems>
            <MenuItems to="/about" _hover={{ color: 'green.400' }}>
              {t('navbar.about')}{' '}
            </MenuItems>
            <MenuItems to="/contactus" _hover={{ color: 'green.400' }}>
              {t('navbar.contactUs')}{' '}
            </MenuItems>
            <Link to="/auth/signup">
              <Button
                variant="outline"
                _hover={{ bg: 'green.400', color: 'white' }}
                _focus={{ boxShadow: 'none' }}
                colorScheme="black"
                bg="white"
                ml={2}
              >
                {t('navbar.getStarted')}
              </Button>
            </Link>
          </Flex>
        </DrawerContent>
      </Drawer>

      <Flex
        align="center"
        justify={['center', 'space-between', 'space-between', 'space-between']}
        direction="row"
        _hover={{ cursor: 'pointer' }}
      >
        <Menu>
          <MenuButton
            mr={2}
            p={2}
            transition="all 0.2s"
            borderRadius="md"
            _hover={{ bg: 'gray.100', color: 'green.400' }}
            _expanded={{ bg: 'gray.100' }}
          >
            <Box color="gray.400">
              <Icon as={Globe} mr={0.5} /> {lang}
            </Box>
          </MenuButton>
          <MenuList minW="max-content">
            <MenuItem
              onClick={() => {
                i18n.changeLanguage('en');
                document.body.dir = i18n.dir();
                setLang('EN');
              }}
            >
              <Box color="gray.400" _hover={{ color: 'green.400' }}>
                EN
              </Box>
            </MenuItem>

            <MenuItem
              onClick={() => {
                i18n.changeLanguage('fr');
                document.body.dir = i18n.dir();
                setLang('FR');
              }}
            >
              <Box color="gray.400" _hover={{ color: 'green.400' }}>
                FR
              </Box>
            </MenuItem>
            <MenuItem
              onClick={() => {
                i18n.changeLanguage('ar');
                document.body.dir = i18n.dir();
                setLang('ع');
              }}
            >
              <Box color="gray.400" _hover={{ color: 'green.400' }}>
                ع
              </Box>
            </MenuItem>
          </MenuList>
        </Menu>
        {user ? (
          <>
            <GetStartedBtn
              logOut={logOut}
              user={user}
              notify={notify}
              isAdmin={isAdmin}
            />
            <Link to="/add-item">
              <Button
                ml={4}
                leftIcon={<Plus />}
                colorScheme="green"
                variant="solid"
              >
                Donate
              </Button>
            </Link>
          </>
        ) : (
          <HStack>
            <Link to="/add-item">
              <Button leftIcon={<Plus />} colorScheme="green" variant="solid">
                Donate
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button
                variant="outline"
                _hover={{ bg: 'green.400', color: 'white' }}
                _focus={{ boxShadow: 'none' }}
                colorScheme="black"
                bg="white"
                ml={2}
                display={{ base: 'none', md: 'block' }}
              >
                {t('navbar.getStarted')}
              </Button>
            </Link>
          </HStack>
        )}
      </Flex>
    </Flex>
  );
}

export default NavBar;
