import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const GoalForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchGoal = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/goals/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const { name, amount, targetDate, currentAmount } = res.data;
          setName(name);
          setAmount(amount);
          setTargetDate(targetDate);
          setCurrentAmount(currentAmount);
        } catch (error) {
          console.error(error);
        }
      };
      fetchGoal();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (isEditMode) {
        await axios.put(`${process.env.REACT_APP_API_URL}/goals/${id}`, { name, amount, targetDate, currentAmount }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/goals`, { name, amount, targetDate, currentAmount }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/goals');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{isEditMode ? 'Edit Goal' : 'Add Goal'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Goal Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          label="Target Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Current Amount"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">{isEditMode ? 'Update Goal' : 'Add Goal'}</Button>
      </form>
    </Container>
  );
};

export default GoalForm;
