import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';
import axios from '../axiosConfig';
import BudgetChart from './charts/BudgetChart';
import TransactionChart from './charts/TransactionChart';
import GoalChart from './charts/GoalChart';
import './Dashboard.css';


const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const budgetRes = await axios.get(`${apiUrl}/api/budgets`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBudgets(budgetRes.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const transactionRes = await axios.get(`${apiUrl}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(transactionRes.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const goalsRes = await axios.get(`${apiUrl}/api/goals`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGoals(goalsRes.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBudgets(), fetchTransactions(), fetchGoals()]);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome, {user ? user.username : 'Guest'}!</p>
      <Container fluid>
      
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            {/* <>
              <SpendingPrediction />
              <>helloo</>
            </> */}
            <div className="summary-card">
              <h2>Budget Summary</h2>
              <BudgetChart budgets={budgets} />
            </div>
            <div className="summary-card">
              <h2>Recent Transactions</h2>
              <TransactionChart transactions={transactions} />
            </div>
            <div className="summary-card">
              <h2>Goals</h2>
              <GoalChart goals={goals} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
