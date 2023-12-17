import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Row,
    Col,
    Form,
    Container,
    Collapse,
    Stack,
    InputGroup,
    Modal
}
    from 'react-bootstrap';

import './select-list-data-control.css';

function SelectListDataControl(props) {

    const [inputField, setInputField] = useState('');
    const [show, setShow] = useState(false);

    const changeHandler = (e) => {

    };

    const handleClose = () => {
        setShow(false);
    }

    const handleClick = () => {
        setShow(true);
    }

    const handleCardClick = (idx) => {
        console.log(idx);
        setShow(false);
    }

    useEffect(() => {

    }, []);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row xs={4} md={4} className="g-4">
                        {Array.from({ length: 11 }).map((_, idx) => (
                            <Col key={idx}>
                                <Card style={{ cursor: 'pointer' }} onClick={() => {
                                    handleCardClick(idx);
                                }} >
                                    <Card.Img variant="top" src="holder.js/100px160" />
                                    {/* <Card.Body>
                                        <Card.Title>Card title</Card.Title>
                                        <Card.Text>
                                            This is a longer card with supporting text below as a natural
                                            lead-in to additional content. This content is a little bit
                                            longer.
                                        </Card.Text>
                                    </Card.Body> */}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <InputGroup className="mb-3">
                <Card style={{ cursor: 'pointer' }} onClick={() => {
                    handleClick();
                }} >
                    <div className="card-container">
                        <Card.Img variant="top"
                            alt="Choose a picture"
                        />
                        {/* <Card.Body>
                                       <Card.Title>Card title</Card.Title>
                                       <Card.Text>
                                           This is a longer card with supporting text below as a natural
                                           lead-in to additional content. This content is a little bit
                                           longer.
                                       </Card.Text>
                                   </Card.Body> */}
                    </div>
                </Card>
            </InputGroup>

        </>
    );
}

export default SelectListDataControl;