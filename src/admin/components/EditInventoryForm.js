/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import setAuthToken from '../../utils/setAuthToken';
import { updateInventory } from '../../utils/api';
import EditForm from './EditForm';

const user = JSON.parse(localStorage.getItem('user'));
export default function EditInventoryForm({ selectedItem, setRows, rows }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [inputData, setInputData] = useState({
    name: selectedItem.name,
    quantity: selectedItem.quantity,
    price: selectedItem.price,
    type: selectedItem.type
  });
  const { name, quantity, price, type } = inputData;
  const handleChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // add changes made to the staff table
  const updatedInventory = (id, inputData) => {
    setRows(rows.map((row) => (row.id === id ? inputData : row)));
  };

  const handleUpdateInventoryItem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = selectedItem.id;
    const InventoryFormData = { id, name, price, quantity, type };
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const data = await updateInventory(InventoryFormData);
      updatedInventory(id, data);
      setIsLoading(false);
      setOpen(false);
      toast.success('Inventory item edited successfully');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  const formDetails = [
    {
      name: 'name',
      id: 'name',
      label: 'Name',
      defaultValue: name
    },
    {
      name: 'price',
      id: 'price',
      label: 'Price',
      defaultValue: price
    },
    {
      name: 'quantity',
      id: 'quantity',
      label: 'Quantity',
      defaultValue: quantity
    },
    {
      name: 'type',
      id: 'type',
      label: 'Type',
      defaultValue: type
    }
  ];

  return (
    <div>
      <EditForm
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        onSubmit={handleUpdateInventoryItem}
        handleChange={handleChange}
        formDetails={formDetails}
        isLoading={isLoading}
        titleText="inventory item"
        btnText="Inventory Item"
      />
    </div>
  );
}
