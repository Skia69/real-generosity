import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const RequestModal = ({
  handleRequest,
  handleChange,
  reqCheck,
  reqCheckLoading,
}) => {
  const currentUser = useAuth();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();

  const handleClick = () => {
    handleRequest();
    onClose();
  };

  if (reqCheckLoading) return <>loading</>;

  return (
    <>
      <Button
        disabled={currentUser && reqCheck.length === 0 ? false : true}
        colorScheme="green"
        w="100%"
        size="lg"
        onClick={onOpen}
      >
        {t('itemPage.request')}
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
          <ModalBody pt="14" pb="4">
            <VStack>
              <Text fontSize="large">Reason for Requesting</Text>
              <Textarea
                size="sm"
                maxW="96"
                minH="24"
                focusBorderColor="green.200"
                onChange={handleChange}
              />
            </VStack>
          </ModalBody>

          <ModalFooter fontSize="medium" justifyContent="space-evenly">
            <Button
              bg="#FF0000"
              textColor="white"
              px="12"
              py="4"
              onClick={handleClick}
            >
              Request
            </Button>

            <Button variant="ghost" px="12" py="4" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default RequestModal;
