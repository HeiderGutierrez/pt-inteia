// AddToCartModal.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Fade, TextField, Button } from "@mui/material";

const AddToCartModal = ({ isOpen, onClose, product, onSaveToCart }) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleSave = async (data) => {
    const quantity = parseInt(data.quantity, 10);
    if (!isNaN(quantity) && quantity > 0) {
      const totalPrice = quantity * product.price;
      const iva = totalPrice * 0.19;
      onSaveToCart({
        productId: product.id,
        productName: product.title,
        quantity,
        totalPrice,
        iva,
      });
    }

    reset();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Fade in={isOpen}>
        <div className="modal">
          <h2>Agregar al Carrito</h2>
          <form onSubmit={handleSubmit(handleSave)}>
            <Controller
              name="quantity"
              control={control}
              defaultValue=""
              rules={{ required: 'La cantidad es requerida', min: 1 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Cantidad"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                />
              )}
            />
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddToCartModal;
