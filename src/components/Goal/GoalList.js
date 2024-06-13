import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/goals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoals(res.data);
    };
    fetchGoals();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${process.env.REACT_APP_API_URL}/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoals(goals.filter(goal => goal._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Goals</h1>
      <button className="btn btn-primary mb-3 w-auto" onClick={() => navigate('/add-goal')}>Add Goal</button>
      <ul className="list-group">
        {goals.map(goal => (
          <li key={goal._id} className="list-group-item d-flex justify-content-between align-items-center">
            {goal.name} - {goal.targetAmount}
            <div>
              <button className="btn btn-warning mr-2" onClick={() => navigate(`/edit-goal/${goal._id}`)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(goal._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalList;
