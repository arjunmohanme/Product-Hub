import {
  Center,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

import ProductCard from "./ProductCard";

function ProductList({
  products,
  loading,
  fetchProducts,
  openEditModal,
}) {
  if (loading) {
    return (
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={8}
        px={10}
        pb={10}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Stack
            key={item}
            bg="white"
            p={5}
            borderRadius="2xl"
            boxShadow="md"
            gap={4}
          >
            <Skeleton height="220px" borderRadius="lg" />
            <Skeleton height="25px" />
            <Skeleton height="20px" width="40%" />
            <Skeleton height="35px" />
          </Stack>
        ))}
      </SimpleGrid>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Center h="60vh">
        <Text
          fontSize="xl"
          color="gray.500"
        >
          No Products Found
        </Text>
      </Center>
    );
  }

  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
        lg: 3,
      }}
      spacing={8}
      px={10}
      pb={10}
    >
      {products.map((product) => (
        <ProductCard
          key={product._id ?? product.id}
          product={product}
          fetchProducts={fetchProducts}
          openEditModal={openEditModal}
        />
      ))}
    </SimpleGrid>
  );
}

export default ProductList;