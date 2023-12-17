
import React, { useMemo, useEffect, useCallback, useState } from 'react';

import {
    Button,
    Form,
    Modal
}
    from 'react-bootstrap';

export default function UploadFileDialog(props) {

    const handleClose = () => {
        props.handleClose();
    }

    const handleSave = () => {
        console.log(selectedFile);
        props.handleSave();
    }

    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <Modal
            show={props.show}
            onHide={handleClose}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control
                            type="file"
                            alue={selectedFile}
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>
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