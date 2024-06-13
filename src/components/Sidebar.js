import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';
const Sidebar = () => (
  <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky"></div>
    <Nav.Item>
      <Nav.Link as={Link} to="/">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/budgets">Budgets</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      {/* <Nav.Link as={Link} to="/budgetpage">Budgetpage</Nav.Link> */}
    </Nav.Item>
    <Nav.Item>
      {/* <Nav.Link as={Link} to="/goalpage">goalpage</Nav.Link> */}
    </Nav.Item>
    <Nav.Item>
      {/* <Nav.Link as={Link} to="/transcationpage">transcationpage</Nav.Link> */}
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/goals">Goals</Nav.Link>
    </Nav.Item>
  </Nav>
);

export default Sidebar;
