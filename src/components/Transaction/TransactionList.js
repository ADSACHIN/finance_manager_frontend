import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const res = await axios.get('/api/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(res.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(transactions.filter(transaction => transaction._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Transactions</h1>
      <button className="btn btn-primary mb-3 w-auto" onClick={() => navigate('/add-transaction')}>Add Transaction</button>
      <ul className="list-group">
        {transactions.map(transaction => (
          <li key={transaction._id} className="list-group-item d-flex justify-content-between align-items-center">
            {transaction.description} - {transaction.amount}
            <div>
              <button className="btn btn-warning mr-2" onClick={() => navigate(`/edit-transaction/${transaction._id}`)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(transaction._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
