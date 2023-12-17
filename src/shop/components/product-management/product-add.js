import React, { useMemo, useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Card,
    Row,
    Col,
    Form,
    Container,
    Collapse,
    Stack, Tab, Tabs
}
    from 'react-bootstrap';

import SaveForm from '../../../components/form/save-form';
import InputCurrency from '../../../components/common/currency-input';

import {
    Switch
} from '@mui/material';

import FilterableOptionList from '../../../components/common/filterable-option-list';
import commonService from "../../dataservices/common.service";
import ImageMultiUploadControl from '../../../components/common/image-multi-load-control';
import { showSuccessMessage, showErrorMessage } from '../../../components/common/notification-control';
import SelectListDataControl from '../../../components/common/select-list-data-control';
import productService from "../../dataservices/product.service";

import * as formik from 'formik';
import * as yup from 'yup';

function ProductAdd(props) {

    const dispatch = useDispatch();
    const apiReducer = useSelector(state => state.apiReducer);
    const [product, setProduct] = useState({
        name: '',
        code: '',
        isActive: true,
        unitPrice: 0.00,
        status: 0,
        weight: 0.00,
        unitCost: 0.00,
        altPrice: 0.00,
        keyWord: '',
        header: '',
        footer: '',
        shortDescription: '',
        description: '',
        smallImage: '',
        mediumImage: '',
        largeImage: '',
        extra1: '',
        extra2: '',
        extra3: '',
        extra4: '',
        extra5: '',
        categoryIds: [],
        thumbImages: [],
        images: []
    });

    const [currency, setCurrency] = useState("0.00");
    const clearState = () => {
        setProduct({
            ...product,
            name: '',
            code: '',
            isActive: true,
            unitPrice: 0.00,
            status: 0,
            weight: 0.00,
            unitCost: 0.00,
            altPrice: 0.00,
            keyWord: '',
            header: '',
            footer: '',
            shortDescription: '',
            description: '',
            smallImage: '',
            mediumImage: '',
            largeImage: '',
            extra1: '',
            extra2: '',
            extra3: '',
            extra4: '',
            extra5: '',
            categoryIds: [],
            thumbImages: [],
            images: []
        });
    };

    const [datasource, setDataSource] = useState([])
    const { Formik } = formik;

    useEffect(() => {

        const fetchData = async () => {
            const res = await commonService.getFilterableOptionList({
                page: 1,
                take: 100,
                typeEntity: 'Category'
            });

            setDataSource(res.data.dataSource);
        }

        fetchData();

    }, [])

    const getListImagesOfProduct = async () => {
        const listImagesOfProduct = await productService.getListImagesOfProduct({
            page: 1,
            take: 100
        });

        return listImagesOfProduct;
    }


    const add = async (data) => {
        try {
            const res = await productService.insert(data);
            console.log(res);
            return Promise.resolve(res.data);
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    };


    const saveHandler = (vaidFormData) => {
        let result = { isSuccess: false, data: {} }

        let formData = new FormData();
        formData.append('name', vaidFormData.name);
        formData.append('code', vaidFormData.code);
        formData.append('shortDescription', vaidFormData.shortDescription);
        formData.append('description', vaidFormData.description);
        formData.append('categoryIds', JSON.stringify(product.CategoryIds));
        formData.append('smallImageName', product.smallImage);
        formData.append('mediumImageName', product.mediumImage);
        formData.append('largeImageName', product.largeImage);

        product.thumbImages.forEach((f, i) => formData.append(`thumbnailImages`, f));
        product.images.forEach((f, i) => formData.append(`images`, f));

        console.log(formData);
        add(formData)
            .then((reponse) => {
                result.isSuccess = true;
                showSuccessMessage();
                clearState();
                //props.handleAfterSave(result);
            })
            .catch((e) => {
                showErrorMessage(e);
                result.isSuccess = false;
                //props.handleAfterSave(result);
            });
    };

    const updateProduct = (columnName, value) => {
        setProduct({
            ...product,
            [columnName]: value
        });
    }
    const callbackFilterableOptionList = (data) => {
        setProduct({
            ...product,
            CategoryIds: data.map((x) => x.id)
        });
    }
    const currencyUpdate = (currency) => {
        console.log(currency);
        setCurrency({ currency });
    }

    const callbackChangeThumbImages = (images) => {
        setProduct({
            ...product,
            thumbImages: images
        });
    }

    const callbackChangeImages = (images) => {
        setProduct({
            ...product,
            images: images
        });
    }

    const schema = yup.object().shape({
        name: yup.string().required('name is required'),
        code: yup.string().required('code is required'),
        // unitPrice: yup.string().required('unitPrice is required'),
        // unitCost: yup.string().required('unitCost is required'),
        // altPrice: yup.string().required('altPrice is required'),
        shortDescription: yup.string().required('shortDescription is required'),
        description: yup.string().required('description is required'),
        // smallImage: yup.string().required('smallImage is required'),
        // mediumImage: yup.string().required('mediumImage is required'),
        // largeImage: yup.string().required('largeImage is required'),
    });

    const handleImageClick = (image) => {
        console.log(image);
        setProduct({
            ...product,
            smallImage: image.fileName
        });
        // smallImage: '',
        // mediumImage: '',
        // largeImage: '',
    }

    return (
        <div>
            <h4 className="liner"  >Update Product</h4>
            <Formik
                validationSchema={schema}
                onSubmit={(vaidFormData) => {
                    console.log(123);
                    saveHandler(vaidFormData);
                }}
                initialValues={{
                    name: '',
                    code: '',
                    // unitPrice: 0.00,
                    // unitCost: 0.00,
                    // altPrice: 0.00,
                    shortDescription: '',
                    description: '',
                    // smallImage: '',
                    // mediumImage: '',
                    // largeImage: '',
                }}>
                {({ handleSubmit, handleChange, values, touched, errors }) =>
                (
                    <SaveForm handleSave={handleSubmit}>
                        <Form noValidate>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label style={{ float: 'left' }}>Name</Form.Label>
                                            <Form.Control type="text"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.name}
                                                placeholder="Enter name" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label style={{ float: 'left' }}>Code</Form.Label>
                                            <Form.Control type="text"
                                                name="code"
                                                value={values.code}
                                                onChange={handleChange}
                                                isInvalid={!!errors.code}
                                                placeholder="Enter ncodeame" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.code}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label style={{ float: 'left' }}>Active: </Form.Label>
                                            <Switch style={{ float: 'left' }}
                                                checked={product.isActive}
                                                onChange=
                                                {(e) => updateProduct('isActive', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label style={{ float: 'left' }}>Choose a or many category: </Form.Label>
                                            <FilterableOptionList style={{ margin: '0px' }}
                                                datasource={datasource}
                                                handleCallBack={callbackFilterableOptionList} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label style={{ float: 'left' }}>Short Description</Form.Label>
                                            <Form.Control as="textarea" style={{ height: '100px' }}
                                                name="shortDescription"
                                                value={values.shortDescription}
                                                onChange={handleChange}
                                                isInvalid={!!errors.shortDescription}
                                                placeholder="Enter shortDescription" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.shortDescription}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label style={{ float: 'left' }}>Description</Form.Label>
                                            <Form.Control as="textarea" style={{ height: '150px' }}
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                isInvalid={!!errors.description}
                                                placeholder="Enter description" />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.description}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Container >
                                            <Row>
                                                <Col style={{ textAlign: 'left', width: '50%' }}>
                                                    <ImageMultiUploadControl
                                                        changeHandlerImage={callbackChangeThumbImages}
                                                        handleImageClick={handleImageClick}
                                                    />

                                                    {/* <SelectListDataControl /> */}
                                                    <ImageMultiUploadControl changeHandlerImage={callbackChangeImages}
                                                        handleImageClick={handleImageClick}
                                                    />
                                                    {/* <SelectListDataControl /> */}
                                                </Col>
                                                <Col style={{ textAlign: 'left', width: '50%' }}>
                                                    <Form.Group >
                                                        <Form.Label style={{ float: 'left' }}>Unit Price</Form.Label>
                                                        <Form.Control type="text"
                                                            name="unitPrice"
                                                            value={values.unitPrice}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.unitPrice}
                                                            placeholder="Enter unitPrice" />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.unitPrice}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <Form.Label style={{ float: 'left' }}>Unit Cost</Form.Label>
                                                        <Form.Control type="text"
                                                            name="unitCost"
                                                            value={values.unitCost}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.unitCost}
                                                            placeholder="Enter unitCost" />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.unitCost}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <Form.Label style={{ float: 'left' }}>Alt Price</Form.Label>
                                                        <Form.Control type="text"
                                                            name="altPrice"
                                                            value={values.altPrice}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.altPrice}
                                                            placeholder="Enter altPrice" />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.altPrice}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Tabs
                                                        defaultActiveKey="profile"
                                                        id="justify-tab-example"
                                                        className="mb-3"
                                                        justify>
                                                        <Tab eventKey="home" title="Home">
                                                        WishList
                                                        </Tab>
                                                        <Tab eventKey="profile" title="Product Discount">
                                                        ProductDiscount
                                                        </Tab>
                                                        <Tab eventKey="longer-tab" title="Product Settings">
                                                        ProductSettings
                                                        </Tab>
                                                    </Tabs>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                        {/* <Form noValidate >
                            <Form.Group as={Col} md="4" controlId="validationFormik01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">Submit form</Button>
                        </Form> */}
                    </SaveForm>

                )}
            </Formik>

        </div >
    );
}

export default ProductAdd;