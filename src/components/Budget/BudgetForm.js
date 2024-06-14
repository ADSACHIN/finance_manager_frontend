import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const BudgetForm = () => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (isEditMode) {
      const fetchBudget = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const res = await axios.get(`${apiUrl}/api/budgets/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const { category, limit, startDate, endDate } = res.data;
          setCategory(category);
          setLimit(limit);
          setStartDate(startDate);
          setEndDate(endDate);
        } catch (error) {
          console.error(error);
        }
      };
      fetchBudget();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const budgetData = { category, limit, startDate, endDate };

      if (isEditMode) {
        await axios.put(`${apiUrl}/api/budgets/${id}`, budgetData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${apiUrl}/api/budgets`, budgetData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/budgets');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">{isEditMode ? 'Edit Budget' : 'Add Budget'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Limit:</label>
          <input type="number" className="form-control" value={limit} onChange={(e) => setLimit(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date:</label>
          <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date:</label>
          <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{isEditMode ? 'Update Budget' : 'Add Budget'}</button>
      </form>
    </div>
  );
};

export default BudgetForm;
