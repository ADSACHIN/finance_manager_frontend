import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axiosConfig';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const TransactionForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (isEditMode) {
      const fetchTransaction = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const res = await axios.get(`${apiUrl}/api/transactions/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const { description, amount, date, category } = res.data;
          setDescription(description);
          setAmount(amount);
          setDate(date);
          setCategory(category);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTransaction();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const transactionData = { description, amount, date, category };
      if (isEditMode) {
        await axios.put(`${apiUrl}/api/transactions/${id}`, transactionData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${apiUrl}/api/transactions`, transactionData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/transactions');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{isEditMode ? 'Edit Transaction' : 'Add Transaction'}</Typography>
      <form onSubmit={handleSubmit}>
        
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Amount"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            required
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">{isEditMode ? 'Update Transaction' : 'Add Transaction'}</Button>
      </form>
    </Container>
  );
};

export default TransactionForm;
