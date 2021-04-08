import React from 'react';
import { AlertCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Select,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

const ReportModal = ({
  handleReport,
  reportType,
  repoCheck,
  repoCheckLoading,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const { t } = useTranslation();
  const currentUser = useAuth();

  const handleClick = () => {
    handleReport();
    onClose();
  };
  if (repoCheckLoading) return <>loading...</>;
  return (
    <>
      <Button
        onClick={onOpen}
        disabled={currentUser && repoCheck.length === 0 ? false : true}
        color="red"
        leftIcon={<AlertCircle size={15} color="red" />}
        variant="ghost"
      >
        {t('itemPage.report')}
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
              <Text fontSize="large">Reason for Reporting</Text>
              <Select
                placeholder="Select option"
                size="sm"
                maxW="96"
                focusBorderColor="green.200"
                ref={reportType}
              >
                <option value="inappropriate content">
                  inappropriate content
                </option>
                <option value="false identity to decieve people">
                  false identity to decieve people
                </option>
                <option value="scam">scam</option>
              </Select>
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
              Report
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
export default ReportModal;
