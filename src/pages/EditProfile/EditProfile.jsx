import React, { useState } from 'react';
import { Box, Flex,Heading, Text, Input, Button } from '@chakra-ui/react';
import Dropzone from '../../components/Dropzone';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../services/firebase';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';

function EditProfile() {
  const { t } = useTranslation();
  const history = useHistory();
  const currentUser = useAuth();
  const userRef=firestore.collection('users').doc(currentUser.uid)
  const [userInfo,userInfoLoading]=useDocumentData(userRef)

  const [idCard, setIdCard] = useState(null);
  console.log(idCard);
  const selectIdCard = (e) => {
    setIdCard(e.target.value);
  };

  const [fullName, setFullName] = useState('');
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const [number, setNumber] = useState('');
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleEdit = async () => {
    await firestore.collection('users').doc(currentUser.uid).set(
      {
        fullname: fullName,
        phoneNumber:number,
      },
      { merge: true }
    );
  };
 const handleSubmit =(e)=>{
   e.preventDefault()
   handleEdit()
   history.goBack()
 }


  if (userInfoLoading) return <>loading</>

  return (
    <Flex
    minH="100vh"
    align="center"
    justify="center"
    m="auto"
    fontSize="md"
    fontWeight="medium"
  >
      <Box>
    <Heading py="2"> {t('profilePage.editProfile')}</Heading>
    <form onSubmit={handleSubmit}>
        <Box>
          <Text mb={2}>{t('editProfile.fullname')}</Text>
           <Input
              placeholder={currentUser &&userInfo? userInfo.fullname:""}
              value={fullName}
              onChange={handleFullNameChange}
              size="md"
              name="fullname"
              variant="filled"
              maxW={['72', '96', '96', '96']}
              focusBorderColor="green.200"
            /> 
        </Box>
        <Box mt={4}>
            <Text mb={2}>{t('editProfile.phone')}</Text>
            <Input
              placeholder={currentUser &&userInfo? userInfo.phoneNumber:""}
              value={number}
              onChange={handleNumberChange}
              type="tel"
              size="md"
              name="tel"
              variant="filled"
              maxW={['72', '96', '96', '96']}
              focusBorderColor="green.200"
            />
          </Box>

        <Box mt={4} maxW={['72', '96', '96', '96']}>
          <Text mb={2}>ID card</Text>
          <Dropzone onChange={selectIdCard} />
         </Box>

         <Box mt={8}>
            <Button
              type="submit"
              colorScheme="green"
              w={['72', '96', '96', '96']}
            >
            {t('editProfile.updateInfo')}
          </Button>
        </Box>
        </form>
      </Box>
    
    </Flex>
  );
}

export default EditProfile;
