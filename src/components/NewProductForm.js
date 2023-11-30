import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Modal, Fade } from "@mui/material";

const NewProductForm = ({ isOpen, onClose, onSave }) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleSave = async (data) => {
    if(!isNaN(data.productName) && !isNaN(data.productDescription)) {
      onSave(data);
    }
    reset();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Fade in={isOpen}>
        <div className="modal">
          <h2>Nuevo Producto</h2>
          <form onSubmit={handleSubmit(handleSave)}>
            <Controller
              name="productName"
              control={control}
              defaultValue=""
              rules={{ required: 'El nombre es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  fullWidth
                  margin="normal"
                  error={!!errors.productName}
                  helperText={errors.productName?.message}
                />
              )}
            />
            <Controller
              name="productDescription"
              control={control}
              defaultValue=""
              rules={{ required: 'La descripción es requerida' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  error={!!errors.productDescription}
                  helperText={errors.productDescription?.message}
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

export default NewProductForm;
