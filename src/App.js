import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BudgetPage from './components/Budget/BudgetPage';
import GoalPage from './components/Goal/GoalPage';
import Dashboard from './components/Dashboard';
import BudgetList from './components/Budget/BudgetList';
import BudgetForm from './components/Budget/BudgetForm';
import GoalList from './components/Goal/GoalList';
import GoalForm from './components/Goal/GoalForm';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import TransactionPage from './components/Transaction/TransactionPage';
import SpendingPrediction from './components/SpendingPrediction'; 
// import Profile from './components/Profile/Profile';
import TransactionForm from './components/Transaction/TransactionForm';
import TransactionList from './components/Transaction/TransactionList';
import UserProfile from './components/Auth/UserProfile';


const App = () => (
  <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/budgetpage" element={<BudgetPage />} />
        <Route path="/goalpage" element={<GoalPage />} />
        <Route path="/transcationpage" element={<TransactionPage />} />
        <Route path="/spendingprediction" element={<SpendingPrediction />} />

        <Route path="/profile" element={<PrivateRoute element={UserProfile} />} />
         
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/budgets" element={<PrivateRoute element={BudgetList} />} />
        <Route path="/add-budget" element={<PrivateRoute element={BudgetForm} />} />
        <Route path="/edit-budget/:id" element={<BudgetForm />} />

        <Route path="/goals" element={<PrivateRoute element={GoalList} />} />
        <Route path="/add-goal" element={<PrivateRoute element={GoalForm} />} />
        <Route path="/edit-goal/:id" element={<GoalForm />} />
        
        <Route path="/transactions" element={<PrivateRoute element={TransactionList}/> } />
        <Route path="/add-transaction" element={<PrivateRoute element={TransactionForm}/>} />
        <Route path="/edit-transaction/:id" element={<TransactionForm />} />

        <Route path="/spending-prediction" element={<PrivateRoute element={SpendingPrediction} />} /> {/* Add the new route */}

      </Routes>
      <Footer />
    </Router>
  </AuthProvider>
);

export default App;
