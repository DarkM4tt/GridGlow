import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import DetailModal from "../../components/DetailModal/DetailModal";

interface Student {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
    street: string;
  };
}

const Home: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [view, setView] = useState<"grid" | "tile">("grid");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const handleTileClick = (student: Student, editMode: boolean = false) => {
    setSelectedStudent(student);
    setIsEditMode(editMode);
    onOpen();
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    onClose();
  };

  const handleDeleteStudent = (id: number) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  return (
    <Box p={4} overflowY="hidden">
      <Box mb={4}>
        <Button onClick={() => setView("grid")} mr={2} colorScheme="blue">
          Grid View
        </Button>
        <Button onClick={() => setView("tile")} colorScheme="green">
          Tile View
        </Button>
      </Box>

      {view === "grid" ? (
        <Box overflowY="auto">
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Website</Th>
                <Th>Company</Th>
                <Th>City</Th>
                <Th>Street</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map((student) => (
                <Tr key={student.id} cursor="pointer">
                  <Td>{student.id}</Td>
                  <Td>{student.name}</Td>
                  <Td>{student.username}</Td>
                  <Td>{student.email}</Td>
                  <Td>{student.phone}</Td>
                  <Td>{student.website}</Td>
                  <Td>{student.company.name}</Td>
                  <Td>{student.address.city}</Td>
                  <Td>{student.address.street}</Td>
                  <Td>
                    <IconButton
                      icon={<ViewIcon />}
                      size="sm"
                      aria-label="View"
                      onClick={() => handleTileClick(student)}
                      mr={2}
                    />
                    <IconButton
                      icon={<EditIcon />}
                      size="sm"
                      aria-label="Edit"
                      onClick={() => handleTileClick(student, true)}
                      mr={2}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      size="sm"
                      aria-label="Delete"
                      onClick={() => handleDeleteStudent(student.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {students.map((student) => (
            <Box
              key={student.id}
              p={4}
              bg="white"
              shadow="md"
              borderRadius="md"
              position="relative"
              cursor="pointer"
            >
              <Box fontWeight="bold" mb={2}>
                {student.name}
              </Box>
              <Box>Email: {student.email}</Box>
              <Box>Phone: {student.phone}</Box>
              <Box>City: {student.address.city}</Box>
              <Box>Company: {student.company.name}</Box>

              <Box position="absolute" top="2" right="2" display="flex" gap={2}>
                <IconButton
                  icon={<ViewIcon />}
                  size="sm"
                  aria-label="View"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTileClick(student);
                  }}
                />
                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  aria-label="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTileClick(student, true);
                  }}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  aria-label="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteStudent(student.id);
                  }}
                />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {selectedStudent && (
        <DetailModal
          isOpen={isOpen}
          onClose={onClose}
          student={selectedStudent}
          isEditMode={isEditMode}
          onUpdateStudent={handleUpdateStudent}
        />
      )}
    </Box>
  );
};

export default Home;
