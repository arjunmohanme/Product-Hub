import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

import api from "../services/api";

function ProductForm({ fetchProducts }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        title: formData.title.trim(),
        price: Number(formData.price),
        image: formData.image.trim(),
        rating: Number(formData.rating),
      };

      await api.post("/products", payload);

      setFormData({
        title: "",
        price: "",
        image: "",
        rating: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bg="white"
      p={6}
      mt={10}
      mx="auto"
      maxW="500px"
      borderRadius="xl"
      shadow="lg"
    >
      <Heading
        size="md"
        mb={5}
      >
        Add Product
      </Heading>

      <VStack gap={4}>
        <Input
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
        />

        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <Input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <Input
          name="rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <Button
          colorScheme="blue"
          width="100%"
          loading={loading}
          onClick={handleSubmit}
        >
          Add Product
        </Button>
      </VStack>
    </Box>
  );
}

export default ProductForm;