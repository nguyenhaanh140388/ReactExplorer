import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Row,
    Col,
    Form,
    Container,
    Collapse,
    Stack
}
    from 'react-bootstrap';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function ImageControl(props) {
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);

    const changeHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
        props.changeHandlerImage(file);
    }
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    return (
        <>
            <Form>
                <Form.Group controlId="formFile" style={{ textAlign: 'left' }} className="mb-3">
                    <Form.Label style={{}}>Image</Form.Label>
                    <Form.Control type="file"
                        style={{ width: '200px' }}
                        id='image'
                        accept='.png, .jpg, .jpeg'
                        onChange={changeHandler}
                    />
                </Form.Group>
            </Form>
            {fileDataURL ?
                <p className="img-preview-wrapper">
                    {
                        <img src={fileDataURL} alt="preview" />
                    }
                </p> : null}
        </>
    );
}
export default ImageControl;