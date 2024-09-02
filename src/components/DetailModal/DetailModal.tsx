import React, { useState, useEffect } from "react";
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
  FormControl,
  FormLabel,
  Input,
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
  isEditMode: boolean;
  onUpdateStudent: (student: Student) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  student,
  isEditMode,
  onUpdateStudent,
}) => {
  const [formData, setFormData] = useState<Student>(student);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setFormData(student);
    setIsDirty(false);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsDirty(true);
  };

  const handleUpdate = () => {
    onUpdateStudent(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditMode ? `Edit ${student.name}` : `${student.name}'s Details`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isEditMode ? (
            <>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Website</FormLabel>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Company</FormLabel>
                <Input
                  name="company.name"
                  value={formData.company.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Catch Phrase</FormLabel>
                <Input
                  name="company.catchPhrase"
                  value={formData.company.catchPhrase}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>BS</FormLabel>
                <Input
                  name="company.bs"
                  value={formData.company.bs}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>City</FormLabel>
                <Input
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Street</FormLabel>
                <Input
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Suite</FormLabel>
                <Input
                  name="address.suite"
                  value={formData.address.suite}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Zipcode</FormLabel>
                <Input
                  name="address.zipcode"
                  value={formData.address.zipcode}
                  onChange={handleChange}
                />
              </FormControl>
            </>
          ) : (
            <>
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
            </>
          )}
        </ModalBody>

        <ModalFooter>
          {isEditMode ? (
            <>
              <Button
                colorScheme="blue"
                onClick={handleUpdate}
                disabled={!isDirty}
              >
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Discard
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailModal;
