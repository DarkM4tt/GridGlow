import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from "@chakra-ui/react";

interface Student {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
  };
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{student.name}'s Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={2}>
            <strong>Username:</strong> {student.username}
          </Box>
          <Box mb={2}>
            <strong>Email:</strong> {student.email}
          </Box>
          <Box mb={2}>
            <strong>Phone:</strong> {student.phone}
          </Box>
          <Box mb={2}>
            <strong>Website:</strong> {student.website}
          </Box>
          <Box mb={2}>
            <strong>Company:</strong> {student.company.name}
          </Box>
          <Box mb={2}>
            <strong>Catch Phrase:</strong> {student.company.catchPhrase}
          </Box>
          <Box mb={2}>
            <strong>BS:</strong> {student.company.bs}
          </Box>
          <Box mb={2}>
            <strong>Address:</strong> {student.address.suite},{" "}
            {student.address.street}, {student.address.city},{" "}
            {student.address.zipcode}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailModal;
