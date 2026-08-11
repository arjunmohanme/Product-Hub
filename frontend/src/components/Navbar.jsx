import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";

function Navbar({
  openAddModal,
  source,
  setSource,
}) {
  return (
    <Box
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={10}
      py={5}
      position="sticky"
      top="0"
      zIndex="100"
    >
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        gap={4}
      >
        {/* Logo */}
        <Box>
          <Heading
            fontFamily="'Manrope', sans-serif"
            fontSize="34px"
            fontWeight="800"
            letterSpacing="-1px"
            color="black"
          >
            ProductHub
          </Heading>

          <Text
            color="gray.600"
            fontSize="sm"
          >
            Browse and manage products
          </Text>
        </Box>

        {/* Actions */}
        <HStack spacing={3}>
          <Button
            bg={source === "fake" ? "black" : "white"}
            color={source === "fake" ? "white" : "black"}
            border="1px solid"
            borderColor="black"
            borderRadius="md"
            _hover={{
              bg: "black",
              color: "white",
            }}
            onClick={() => setSource("fake")}
          >
            Fake Store
          </Button>

          <Button
            bg={source === "mongodb" ? "black" : "white"}
            color={source === "mongodb" ? "white" : "black"}
            border="1px solid"
            borderColor="black"
            borderRadius="md"
            _hover={{
              bg: "black",
              color: "white",
            }}
            onClick={() => setSource("mongodb")}
          >
            MongoDB
          </Button>

          {source === "mongodb" && (
            <Button
              bg="black"
              color="white"
              borderRadius="md"
              _hover={{
                bg: "gray.800",
              }}
              onClick={openAddModal}
            >
              + Add Product
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;