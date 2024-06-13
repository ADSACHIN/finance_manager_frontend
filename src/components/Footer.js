import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-white mt-5 p-4 text-center">
    
      <Row>
        <Col>
          <p>&copy; {new Date().getFullYear()} AI-Powered Personal Finance Manager. All Rights Reserved.</p>
        </Col>
      </Row>
    
  </footer>
);

export default Footer;
