import { useEffect, useState } from "react";
import {
  Dialog,
  Portal,
  Button,
  Input,
  Stack,
  Field,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { backendApi } from "../services/api";

function ProductModal({
  open,
  onClose,
  fetchProducts,
  editingProduct,
}) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title,
        price: editingProduct.price,
        image: editingProduct.image,
        rating: editingProduct.rating,
      });
    } else {
      setFormData({
        title: "",
        price: "",
        image: "",
        rating: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (formData.title.trim().length < 5) {
      toast.error("Title must contain at least 5 characters.");
      return false;
    }

    if (Number(formData.price) <= 0) {
      toast.error("Price must be greater than 0.");
      return false;
    }

    if (!formData.image.startsWith("http")) {
      toast.error("Enter a valid image URL.");
      return false;
    }

    if (
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5
    ) {
      toast.error("Rating must be between 0 and 5.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const payload = {
      title: formData.title.trim(),
      price: Number(formData.price),
      image: formData.image.trim(),
      rating: Number(formData.rating),
    };

    try {
      if (editingProduct) {
        await backendApi.put(
          `/products/${editingProduct._id}`,
          payload
        );

        toast.success("Product updated successfully");
      } else {
        await backendApi.post("/products", payload);

        toast.success("Product added successfully");
      }

      fetchProducts();

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {editingProduct ? "Edit Product" : "Add Product"}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Stack gap={4}>
                <Field.Root>
                  <Input
                    name="title"
                    placeholder="Product Title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Field.Root>

                <Field.Root>
                  <Input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Field.Root>

                <Field.Root>
                  <Input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </Field.Root>

                <Field.Root>
                  <Input
                    name="rating"
                    type="number"
                    step="0.1"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                colorScheme="blue"
                loading={loading}
                onClick={handleSubmit}
              >
                {editingProduct ? "Update" : "Add"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default ProductModal;