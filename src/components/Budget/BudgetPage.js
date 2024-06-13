import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import BudgetList from './BudgetList';
import BudgetForm from './BudgetForm';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar';

const BudgetPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
       <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col >
          <BudgetList />
          <BudgetForm />
          </Col>
        </Row>
      
    </div>
  );
};

export default BudgetPage;
