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
import { EditIcon, WarningIcon, DeleteIcon } from "@chakra-ui/icons";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const handleTileClick = (student: Student) => {
    setSelectedStudent(student);
    onOpen();
  };

  const handleClose = () => {
    setSelectedStudent(null);
    onClose();
  };

  return (
    <Box p={4}>
      <Box mb={4}>
        <Button onClick={() => setView("grid")} mr={2} colorScheme="blue">
          Grid View
        </Button>
        <Button onClick={() => setView("tile")} colorScheme="green">
          Tile View
        </Button>
      </Box>

      {view === "grid" ? (
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
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr
                key={student.id}
                onClick={() => handleTileClick(student)}
                cursor="pointer"
              >
                <Td>{student.id}</Td>
                <Td>{student.name}</Td>
                <Td>{student.username}</Td>
                <Td>{student.email}</Td>
                <Td>{student.phone}</Td>
                <Td>{student.website}</Td>
                <Td>{student.company.name}</Td>
                <Td>{student.address.city}</Td>
                <Td>{student.address.street}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {students.map((student) => (
            <Box
              key={student.id}
              p={4}
              bg="white"
              shadow="md"
              borderRadius="md"
              onClick={() => handleTileClick(student)}
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

              {/* Action Buttons */}
              <Box position="absolute" top="2" right="2" display="flex" gap={2}>
                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  aria-label="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <IconButton
                  icon={<WarningIcon />}
                  size="sm"
                  aria-label="Flag"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  aria-label="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
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
          onClose={handleClose}
          student={selectedStudent}
        />
      )}
    </Box>
  );
};

export default Home;
