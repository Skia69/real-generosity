import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, LogOut, Bell, Mail } from 'react-feather';
import { firestore } from '../../services/firebase';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  AvatarBadge,
  IconButton,
  HStack,
} from '@chakra-ui/react';

const GetStartedBtn = ({ logOut, user, notify, isAdmin }) => {
  const { t } = useTranslation();

   const handleClick = async (id) => {
        await firestore.collection('notifications').doc(id).set(
          {
            seen: true,
          },
          { merge: true }
        );
      };

  return (
    <HStack>
      <Menu border="1px">
        <MenuButton
          as={IconButton}
          color="gray.400"
          aria-label="Options"
          icon={
            <Avatar size="sm" bg="white" icon={<Bell fontSize="1.5rem" />}>
              {notify?.docs.length ? <AvatarBadge boxSize="1.25em" bg="red" /> : ''}
            </Avatar>
          }
          size="md"
          variant="white"
        />
        <MenuList>
        {user && notify? 
          notify.docs.map(notification=>
          (notification  && 
          <Link to={`/item/${notification?.data().itemId}/${notification.data().type}s`}>
           <MenuItem
            onClick={()=>handleClick(notification?.id)}
            icon= { <Mail fontSize="1.5rem"  />}
            >
            {notification.data().type}
          </MenuItem>
          </Link>)
          ):''} 

          {isAdmin && notify ? (
            <Link to="/admin">
              <MenuItem>Notifications</MenuItem>
            </Link>
          ) : (
            <Link to={`/profile/${user.uid}/notifications`}>
              <MenuItem>Notifications</MenuItem>
            </Link>
          )}
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton
          as={IconButton}
          color="black"
          aria-label="Options"
          icon={<Avatar size="sm" bg="black" />}
          size="md"
          variant="white"
        />
        <MenuList>
          {isAdmin ? (
            <Link to="/admin">
              <MenuItem icon={<User />}>users</MenuItem>
            </Link>
          ) : (
            <Link to={`/profile/${user.uid}`}>
              <MenuItem icon={<User />}>{t('navbar.profile')}</MenuItem>
            </Link>
          )}
          <MenuItem onClick={logOut} icon={<LogOut />}>
            {t('navbar.logout')}
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
export default GetStartedBtn;
