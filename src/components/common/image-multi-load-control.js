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

}
    from 'react-bootstrap';
import './image-multi-load-control.css';

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

function ImageMultiLoadControl(props) {
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);

    const changeHandler = (e) => {
        const { files } = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
            }
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            props.changeHandlerImage(validImageFiles);
            return;
        }
        alert("Selected images are not of valid type!");
    };

    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push({fileName:file.name,data:result})
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                    }
                }
                fileReader.readAsDataURL(file);
            })
        };
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles]);

    const handleClick = (image) => {
        props.handleImageClick(image);
    }

    return (
        <>
            <Form >
                <Form.Group style={{ textAlign: 'left' }} className="mb-3">
                    <Form.Label>{props.title}</Form.Label>
                    <Form.Control type="file"

                        style={{ width: '100%' }}
                        id='image'
                        multiple="multiple"
                        accept='.png, .jpg, .jpeg'
                        onChange={changeHandler}
                    />
                </Form.Group>
            </Form>
            {
                images.length > 0 ?
                    <div className="clearfix">
                        {
                            images.map((image, idx) => {
                                return (
                                    <div key={idx} className="img-container">
                                        <img key={idx} src={image.data} alt=""
                                            style={{ width: '100%', cursor: 'pointer' }}
                                            onClick={() => {
                                                handleClick(image);
                                            }}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div> : null
            }
        </>
    );
}

export default ImageMultiLoadControl;