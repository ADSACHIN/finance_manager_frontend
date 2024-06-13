import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import GoalList from './GoalList';
import GoalForm from './GoalForm';
import Sidebar from '../Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const GoalPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col >
          <GoalList />
          <GoalForm />
          </Col>
        </Row>
      
      
    </div>
  );
};

export default GoalPage;
