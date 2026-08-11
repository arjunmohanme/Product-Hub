import { Input, Box } from "@chakra-ui/react";

function SearchBar({ search, setSearch }) {
  return (
    <Box px={10} pb={6}>
      <Input
        size="lg"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        bg="white"
        borderRadius="xl"
      />
    </Box>
  );
}

export default SearchBar;