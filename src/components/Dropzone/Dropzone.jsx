import {
  Alert,
  AlertDescription,
  AlertIcon,
  Flex,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFromBlobAsync } from '../../helpers/ImageUpload';

function Dropzone({ setImage }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles?.[0];

      if (!file) {
        return;
      }

      setIsLoading(true);
      setError(null);
      setMessage(null);

      try {
        setImage(
          await uploadFromBlobAsync({
            blobUrl: URL.createObjectURL(file),
            name: `${file.name}_${Date.now()}`,
          })
        );
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
        return;
      }

      setIsLoading(false);
      setMessage('File was uploaded 👍');
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Flex
        bg="gray.100"
        justify="center"
        align="center"
        h={150}
        p={50}
        borderRadius={5}
        textAlign="center"
        {...getRootProps()}
      >
        <Input {...getInputProps()} />
        {isLoading ? (
          <Spinner />
        ) : isDragActive ? (
          <Text>Drop the file here...</Text>
        ) : (
          <Text>Drag 'n' drop some file here, or click to select files</Text>
        )}
      </Flex>
      {(error || message) && (
        <Alert status={error ? 'error' : 'success'} mt={4} borderRadius={5}>
          <AlertIcon />
          <AlertDescription>{error || message}</AlertDescription>
        </Alert>
      )}
    </>
  );
}

export default Dropzone;
