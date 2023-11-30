import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { theme } from "./theme/theme";
import { CartProvider } from "./context/cart";

const App = () => {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" Component={ProductList} />
            <Route path="/product/:productId" Component={ProductDetail} />
          </Routes>
          <Footer />
        </CartProvider>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
