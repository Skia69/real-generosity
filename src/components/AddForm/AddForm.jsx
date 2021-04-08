import { Box, Stack, Input, Select, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { firestore } from '../../services/firebase';
import Dropzone from '../Dropzone';

const AddForm = ({ register, setImage }) => {
  const { t } = useTranslation();

  //get all categories
  const categoriesRef = firestore.collection('categories');
  const query = categoriesRef.where('name', '>', 'all');
  const [categories, loading, error] = useCollectionData(query);

  if (error) console.error(error);
  if (loading) return <>loading ...</>;

  return (
    <Stack spacing={8} fontSize={15} fontWeight={400}>
      <Box fontSize="lg">
        <Text fontWeight="semibold" textColor="gray.700" mb={2}>
          {t('additem.title')}
        </Text>
        <Input
          name="title"
          ref={register}
          type="text"
          size="lg"
          variant="filled"
          isRequired
          focusBorderColor="green.200"
        />
      </Box>

      <Box fontSize="lg">
        <Text fontWeight="semibold" textColor="gray.700" mb={2}>
          {t('additem.category')}
        </Text>
        <Select
          name="category"
          ref={register}
          size="lg"
          variant="filled"
          isRequired
          focusBorderColor="green.200"
        >
          <option defaultValue hidden>
            Please select a category
          </option>
          {categories.map((category, index) => (
            <option key={index}>{category.name}</option>
          ))}
        </Select>
      </Box>

      <Box fontSize="lg">
        <Text fontWeight="semibold" textColor="gray.700" mb={2}>
          {t('additem.description')}
        </Text>
        <Textarea
          name="description"
          ref={register}
          size="lg"
          variant="filled"
          isRequired
          focusBorderColor="green.200"
        />
      </Box>

      <Box fontSize="lg">
        <Text fontWeight="semibold" textColor="gray.700" mb={2}>
          {t('additem.uploadimages')}
        </Text>
        <Dropzone dropzoneRef={register} setImage={setImage} />
      </Box>
    </Stack>
  );
};

export default AddForm;
