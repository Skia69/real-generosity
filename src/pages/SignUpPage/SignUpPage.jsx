import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../../services/firebase';
import { useHistory } from 'react-router-dom';

function SignUpPage() {
  const { t } = useTranslation();
  const { register, handleSubmit, errors, getValues } = useForm();

  const history = useHistory();
  const toast = useToast();
  // const [image, setImage] = React.useState();

  const onSubmit = async ({ fullname, email, password, phone }) => {
    console.log('registration in process...');
    console.log('email', email);
    console.log('phone', phone);

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await firestore.collection('users').doc(user.uid).set({
        fullname,
        email,
        phone,
        role: 'user',
        uid: user.uid,
        isApproved: false,
      });
      toast({
        title: 'Account created.',
        description: 'Your account was successfully created.',
        status: 'success',
        duration: 7000,
        isClosable: true,
      });

      history.push('/');
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === 'auth/email-already-in-use') {
        toast({
          title: 'Sign Up Failed',
          description: 'Email already exists.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box w="xl" bg="white" p={16} borderRadius="md" boxShadow="md">
        <Heading mb="2">{t('navbar.getStarted')}</Heading>

        <HStack mb="12">
          <Text textColor="gray.400">{t('signup.subheading')} </Text>
          <Link to="/auth/signin">
            <Text textColor="blue.400">{t('signin.signinbutton')}</Text>
          </Link>
        </HStack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Text mb={2}>{t('signup.fullname')}</Text>
            <Input
              size="lg"
              name="fullname"
              variant="filled"
              isRequired
              focusBorderColor="green.200"
              ref={register}
            />
          </Box>

          <Box mt={4}>
            <Text mb={2}>{t('signup.email')}</Text>
            <Input
              placeholder="samir@realgen.com"
              type="email"
              size="lg"
              name="email"
              variant="filled"
              isRequired
              ref={register}
              focusBorderColor="green.200"
            />
          </Box>
          <Box mt={4}>
            <Text mb={2}>{t('signup.password')}</Text>
            <Input
              placeholder={t('signup.passplaceholder')}
              size="lg"
              name="password"
              type="password"
              variant="filled"
              isRequired
              ref={register}
              focusBorderColor="green.200"
              pattern="(?=.*[a-z]{1,})(?=.*[A-Z]{1,})(?=.*[0-9]{1,})(?=.*[!@#\$%\^&\*]).{5,}$"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            />
            {errors.password && <Text>{errors.password.message} </Text>}
          </Box>
          <Box mt={4}>
            <Text mb={2}>{t('signup.repeat')}</Text>
            <Input
              placeholder={t('signup.passplaceholder')}
              size="lg"
              type="password"
              name="confirm"
              variant="filled"
              isRequired
              ref={register({
                validate: (value) => {
                  if (value === getValues('password')) {
                    return true;
                  } else {
                    return <span>Password fields don't match</span>;
                  }
                },
              })}
              focusBorderColor="green.200"
            />
            {errors.confirm && <p>{errors.confirm.message}</p>}
          </Box>
          <Box mt={4}>
            <Text mb={2}>{t('signup.phone')}</Text>
            <Input
              placeholder="+961...`"
              type="phone"
              size="lg"
              name="phone"
              variant="filled"
              isRequired
              ref={register}
              focusBorderColor="green.200"
            />
          </Box>
          <Box mt={8}>
            <Button type="submit" colorScheme="green" w="full" size="lg">
              {t('signup.createbutton')}
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
}

export default SignUpPage;
