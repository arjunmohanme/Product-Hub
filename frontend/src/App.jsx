import { useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import DashboardStats from "./components/DashboardStats";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";

import { backendApi, fakeStoreApi } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fake Store is the landing page
  const [source, setSource] = useState("fake");

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // -----------------------------
  // MongoDB Products
  // -----------------------------
  const fetchMongoProducts = async () => {
    try {
      setLoading(true);

      const response = await backendApi.get("/products");

      setProducts(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Fake Store Products
  // -----------------------------
  const fetchFakeProducts = async () => {
    try {
      setLoading(true);

      const response = await fakeStoreApi.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Initial Load / Toggle
  // -----------------------------
  useEffect(() => {
    if (source === "fake") {
      fetchFakeProducts();
    } else {
      fetchMongoProducts();
    }
  }, [source]);

  // -----------------------------
  // Search
  // -----------------------------
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // -----------------------------
  // Modal
  // -----------------------------
  const openAddModal = () => {
    if (source !== "mongodb") return;

    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    if (source !== "mongodb") return;

    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar
        source={source}
        setSource={setSource}
        openAddModal={openAddModal}
      />

      <DashboardStats products={products} />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <ProductList
        products={filteredProducts}
        loading={loading}
        fetchProducts={
          source === "mongodb"
            ? fetchMongoProducts
            : fetchFakeProducts
        }
        openEditModal={openEditModal}
      />

      {source === "mongodb" && (
        <ProductModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fetchProducts={fetchMongoProducts}
          editingProduct={editingProduct}
        />
      )}
    </Box>
  );
}

export default App;