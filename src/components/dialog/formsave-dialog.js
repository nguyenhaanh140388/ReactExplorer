import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useMemo, useEffect, useCallback, useState } from 'react';

export default function FormSaveDialog(props) {
    const handleClose = () => {
        props.handleClose();
    }
    const handleSave = () => {
        props.handleSave();
    }

    return (
        <Modal
            show={props.show}
            onHide={handleClose}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}