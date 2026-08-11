import {
  Box,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

function DashboardStats({ products }) {
  const totalProducts = products.length;

  const averagePrice =
    totalProducts === 0
      ? 0
      : (
          products.reduce(
            (sum, product) => sum + Number(product.price),
            0
          ) / totalProducts
        ).toFixed(2);

  const averageRating =
    totalProducts === 0
      ? 0
      : (
          products.reduce(
            (sum, product) =>
              sum +
              Number(product.rating?.rate ?? product.rating),
            0
          ) / totalProducts
        ).toFixed(1);

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
    },
    {
      title: "Average Price",
      value: `₹ ${averagePrice}`,
    },
    {
      title: "Average Rating",
      value: `⭐ ${averageRating}`,
    },
  ];

  return (
    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      gap={6}
      px={10}
      py={6}
    >
      {cards.map((card) => (
        <Box
          key={card.title}
          bg="white"
          p={6}
          borderRadius="xl"
          boxShadow="md"
        >
          <VStack align="start" gap={2}>
            <Text
              color="gray.500"
              fontSize="sm"
            >
              {card.title}
            </Text>

            <Text
              fontSize="3xl"
              fontWeight="bold"
            >
              {card.value}
            </Text>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default DashboardStats;