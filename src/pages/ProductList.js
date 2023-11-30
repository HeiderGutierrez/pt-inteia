import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import NewProductForm from "../components/NewProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/products");
      const initialProducts = response.data.slice(0, 10);
      localStorage.setItem("products", JSON.stringify(initialProducts));
      setProducts(initialProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = (newProduct) => {
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    const newProductId = lastProductId + 1;
    const productWithId = { ...newProduct, id: newProductId };
    
    const updatedProducts = [...products, productWithId];
    
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setShowAlert(true);
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
    if (storedProducts.length === 0) {
      fetchProducts();
    } else {
      setProducts(storedProducts);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Box>
      <Container maxWidth="xl">
        <Box display={"flex"} justifyContent={"space-between"} my={4}>
          <Typography variant="h5">
            Productos
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={openModal}
          >
            Agregar Producto
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Ver Detalle</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/product/${product.id}`}
                        variant="outlined"
                        color="primary"
                      >
                        Ver Detalle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <NewProductForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleAddProduct}
      />
      {/* Agregar el Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Producto creado exitosamente.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductList;
