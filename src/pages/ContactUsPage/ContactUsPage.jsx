import React from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';
import {
  Box,
  Text,
  Heading,
  Flex,
  Input,
  Textarea,
  Button,
  HStack,
} from '@chakra-ui/react';

function ContactUsPage() {
  const { t } = useTranslation();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'real_generosity',
        'template_in561cn',
        e.target,
        'user_0AZ26wMMAKxuuS0KdvVRX'
      )
      .then(
        (result) => {
          alert(`${t('contactUs.alert')}`);
        },
        (error) => {
          alert(error.message);
        }
      );
    e.target.reset();
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      fontSize="md"
      fontWeight="medium"
    >
      <Box bg="white" p={16} borderRadius="md" boxShadow="md">
        <Heading mb="2">{t('contactUs.contact')}</Heading>
        <HStack mb="12">
          <Text textColor="gray.400">{t('contactUs.subheading')} </Text>
        </HStack>
        <form onSubmit={sendEmail}>
          <Box>
            <Text mb={2}>{t('contactUs.fullname')}</Text>
            <Input
              type="text"
              size="sm"
              variant="filled"
              isRequired
              maxW={['72', '96', '96', '96']}
              focusBorderColor="green.200"
              name="name"
            />
          </Box>

          <Box mt={8} fontSize={['xx-small', 'md', 'md', 'lg']}>
            <Text mb={2}>{t('contactUs.email')}</Text>
            <Input
              type="email"
              size="sm"
              variant="filled"
              isRequired
              maxW={['72', '96', '96', '96']}
              focusBorderColor="green.200"
              name="email"
            />
          </Box>

          <Box mt={8} fontSize="lg">
            <Text mb={2}>{t('contactUs.message')}</Text>
            <Textarea
              size="sm"
              variant="filled"
              isRequired
              maxW={['72', '96', '96', '96']}
              focusBorderColor="green.200"
              name="message"
            />
          </Box>

          <Box mt={8}>
            <Button
              type="submit"
              colorScheme="green"
              w={['72', '96', '96', '96']}
            >
              {t('contactUs.send')}
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
}

export default ContactUsPage;
