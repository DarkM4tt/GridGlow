import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const About: React.FC = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>About Us</Heading>
      <Text>
        Welcome to StudentApp! We are dedicated to providing the best platform
        for managing student data with an emphasis on beautiful and
        user-friendly design.
      </Text>
    </Box>
  );
};

export default About;
