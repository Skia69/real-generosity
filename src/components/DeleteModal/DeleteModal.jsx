import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2 } from 'react-feather';
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
} from '@chakra-ui/react';

const DeleteModal = ({ handleDelete }) => {
  const handleClick = () => {
    handleDelete();
    onClose();
  };
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();

  return (
    <>
      <Button leftIcon={<Trash2 size={15} />} onClick={onOpen} variant="ghost">
        {t('itemPage.delete')}
      </Button>

      <Modal
        size="xl"
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent py="12" px="12" align="center">
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="large" textAlign="center">
              {t('itemPage.deletep')}
            </Text>
          </ModalBody>

          <ModalFooter justifyContent="space-evenly" fontSize="medium">
            <Button
              bg="#FF0000"
              textColor="white"
              px="12"
              py="4"
              onClick={handleClick}
            >
              {t('itemPage.delete')}
            </Button>
            <Button variant="ghost" px="12" py="4" onClick={onClose}>
              {t('itemPage.cancel')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeleteModal;
