
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import React, { useMemo, useEffect, useCallback, useState } from 'react';
import {
  Button,
  Card,
  Row,
  Col,
  Form,
  Container,
  Collapse,
}
  from 'react-bootstrap';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function SaveForm(props) {



  return (
    <>
      <Container style={{ padding: '10px', border: "6px solid #52BE80 ", borderRadius: '0.6rem' }}>
        <Row>
          <Col>
          </Col>
        </Row>
        <Row >
          <Col > {props.children}</Col>
        </Row>
        <Row>
          <Col>
          </Col>
          <Col>  <Button variant="primary"
            onClick={props.handleSave}
          >
            Save Changes
          </Button>{' '}
            <Button variant="secondary"
            // onClick={handleClose}
            >
              Close
            </Button>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}