import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/budgets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBudgets(res.data);
    };
    fetchBudgets();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${process.env.REACT_APP_API_URL}/budgets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBudgets(budgets.filter(budget => budget._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Budgets</h1>
      <button className="btn btn-primary mb-3 w-auto" onClick={() => navigate('/add-budget')}>Add Budget</button>
      <ul className="list-group">
        {budgets.map(budget => (
          <li key={budget._id} className="list-group-item d-flex justify-content-between align-items-center">
            {budget.category} - {budget.limit}
            <div>
              <button className="btn btn-warning mr-2" onClick={() => navigate(`/edit-budget/${budget._id}`)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(budget._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;
