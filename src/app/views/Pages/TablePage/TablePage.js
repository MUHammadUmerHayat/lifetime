import React from 'react';
import { Row, Col } from 'react-bootstrap';
import DashboardView from '../../Layouts/DashboardView';

const TablePage = () => (
  <DashboardView
    title="Table"
  >
    <Row>
      <Col xs={12}>
        <h3 className="title">Media</h3>
      </Col>
    </Row>
  </DashboardView>
);

export default TablePage;
