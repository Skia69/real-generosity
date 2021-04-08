import React from 'react';
// import { useTranslation } from 'react-i18next';
import { Phone, Mail, User } from 'react-feather';
// import { firestore } from '../../services/firebase';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuth } from '../../contexts/AuthContext';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  ModalHeader,
  Grid,
  HStack,
} from '@chakra-ui/react';

const ContactInfoModal = ({ ownerInfo, users, requesterid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const currentUser = useAuth();

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Contact Info
      </Button>

      <Modal
        size="xl"
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid>
              <HStack my={3}>
                <User />
                <Text fontSize="lg" fontWeight="medium">
                  Full Name:
                </Text>
                <Text fontSize="lg" fontWeight="medium">
                  {currentUser && ownerInfo ? ownerInfo.fullname : ''}
                  {currentUser && users
                    ? users
                        .filter((user) => user.uid === requesterid)
                        ?.map((u) => <span>{u.fullname}</span>)
                    : ''}
                </Text>
              </HStack>
              <HStack my={3}>
                <Mail />
                <Text fontSize="lg" fontWeight="medium">
                  Email Address:
                </Text>
                <Text fontSize="lg" fontWeight="medium">
                  {currentUser && ownerInfo ? ownerInfo.email : ''}
                  {currentUser && users
                    ? users
                        .filter((user) => user.uid === requesterid)
                        ?.map((u) => <span>{u.email}</span>)
                    : ''}
                </Text>
              </HStack>
              <HStack my={3}>
                <Phone />
                <Text fontSize="lg" fontWeight="medium">
                  phone number:
                </Text>
                <Text fontSize="lg" fontWeight="medium">
                  {currentUser && ownerInfo ? ownerInfo.phonenumber : ''}
                  {currentUser && users
                    ? users
                        .filter((user) => user.uid === requesterid)
                        ?.map((u) => <span>{u.phonenumber}</span>)
                    : ''}
                </Text>
              </HStack>
            </Grid>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ContactInfoModal;
