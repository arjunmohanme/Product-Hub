import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FaEdit, FaStar, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import { backendApi } from "../services/api";

function ProductCard({
  product,
  fetchProducts,
  openEditModal,
}) {
  const isMongoProduct = !!product._id;

  const rating = product.rating?.rate ?? product.rating;

  const handleDelete = async () => {
    if (!isMongoProduct) {
      toast("Fake Store products cannot be deleted.");
      return;
    }

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await backendApi.delete(`/products/${product._id}`);

      toast.success("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lg"
      transition="all .3s ease"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
      }}
    >
      <Image
        src={product.image}
        alt={product.title}
        h="250px"
        w="100%"
        objectFit="contain"
        bg="gray.50"
        p={4}
      />

      <VStack align="stretch" p={5} gap={4}>
        <Heading size="md" lineClamp={2}>
          {product.title}
        </Heading>

        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="blue.600"
        >
          ₹ {Number(product.price).toLocaleString()}
        </Text>

        <HStack justify="space-between">
          <Badge colorScheme="green">
            <HStack gap={1}>
              <Icon as={FaStar} />
              <Text>{rating}</Text>
            </HStack>
          </Badge>

          {!isMongoProduct && (
            <Badge colorScheme="purple">
              Fake Store
            </Badge>
          )}
        </HStack>

        <HStack>
          <Button
            flex={1}
            colorScheme="blue"
            onClick={() => {
              if (!isMongoProduct) {
                toast("Fake Store products cannot be edited.");
                return;
              }

              openEditModal(product);
            }}
          >
            <FaEdit />
            Edit
          </Button>

          <Button
            flex={1}
            colorScheme="red"
            onClick={handleDelete}
          >
            <FaTrash />
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ProductCard;