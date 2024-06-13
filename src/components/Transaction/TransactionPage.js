import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import Sidebar from '../Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const TransactionPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col >
          <TransactionForm /> 
      <TransactionList />
          </Col>
        </Row>
      
    </div>
  );
};

export default TransactionPage;
