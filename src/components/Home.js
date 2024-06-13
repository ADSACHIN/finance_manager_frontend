import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ImageSlider from './ImageSlider';
import Sidebar from './Sidebar';
import Header from './Header';
const Home = () => (
  
    <Container  fluid>
      
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <ImageSlider />
          <div className="text-center mt-5">
            <h1>Welcome to the AI-Powered Personal Finance Manager</h1>
            <p>Manage your finances efficiently and effectively.</p>
          </div>
        </Col>
      </Row>
    </Container>
  
);

export default Home;
