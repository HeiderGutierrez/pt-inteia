import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Alert,
  Snackbar,
} from "@mui/material";
import Banner from "../assets/images/banner.jpg";
import AddToCartModal from "../components/AddToCartModal";
import { useCart } from "../context/cart";

const ProductDetail = () => {
  const { cart, updateCart } = useCart();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveToCart = async (cartItem) => {
    await updateCart([...cart, cartItem]);
    setShowAlert(true);
  };

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  return (
    <Box>
      <Container maxWidth="xl">
        {/* Banner */}
        <Box
          sx={{
            width: "100%",
            height: 300,
            display: {xs: 'none', md: 'block'},
            overflow: "hidden",
            mb: 2,
            borderRadius: 5,
          }}
        >
          <img
            src={Banner}
            alt="Banner market"
            style={{ objectFit: "cover" }}
            width={"100%"}
            height={"100%"}
          />
        </Box>

        {/* Detalles del producto */}
        {product ? (
          <Grid container spacing={5}>
            {/* Imagen del producto */}
            <Grid item xs={12} md={6}>
              <img
                src={product.images[0]}
                alt={product.title}
                style={{ width: "100%", borderRadius: 20 }}
              />
            </Grid>

            {/* Información del detalle */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: {xs: 2, md: 5}
                }}
              >
                <Typography
                  component={"h1"}
                  color={'primary'}
                  sx={{fontSize: {xs: 25, md: 35}, fontWeight: 'bold'}}
                >
                  {product.title}
                </Typography>
                <Typography fontSize={14} color={"#989898"}>
                  ID del producto: {product.id}
                </Typography>
                <Typography fontSize={14} color={"#989898"}>
                  {product.description}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    fontSize={20}
                    color={"#042940"}
                    fontWeight={"bold"}
                  >
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={openModal}
                    color="secondary"
                  >
                    Agregar al carrito
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <p>Cargando detalles del producto...</p>
        )}
      </Container>

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
          Producto agregado al carrito exitosamente.
        </Alert>
      </Snackbar>

      {/* Agregar el modal */}
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={product}
        onSaveToCart={handleSaveToCart}
      />
    </Box>
  );
};

export default ProductDetail;
