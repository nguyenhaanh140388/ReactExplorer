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
}
    from 'react-bootstrap';
import FormSaveDialog from '../../../components/dialog/formsave-dialog';
import {
    Switch
} from '@mui/material';

import categoryService from "../../dataservices/category.service"
import { RETRIEVE_DATA, UPDATE_DATA, CREATE_DATA } from "../../../redux/actions/type"
import FilterableOptionList from '../../../components/common/filterable-option-list';
import commonService from "../../dataservices/common.service";

function CategoryUpdate(props) {
    const dispatch = useDispatch();
    const apiReducer = useSelector(state => state.apiReducer);

    const [category, setCategory] = useState({
        name: '',
        // dateOfCreateFrom: '',
        // dateOfCreateTo: '',
        // dateOfUpdateFrom: '',
        // dateOfUpdateTo: '',
        isActive: true,
        DepartmentIds: null
        // isSearch: false,
    });

    const clearState = () => {
        setCategory({
            ...category,
            name: '',
            isActive: true
        });
    };

    const [datasource, setDataSource] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const res = await commonService.getFilterableOptionList({
                page: 1,
                take: 100,
                typeEntity: 'Department',
            });

            setDataSource(res.data.dataSource);
        }

        fetchData();
    }, [])

    const add = async (data) => {
        try {
            const res = await categoryService.insert(data);

            dispatch({
                type: CREATE_DATA,
                payload: data,
            });

            return Promise.resolve(res.data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const saveHandler = () => {
        // callback to output
        console.log(category);
        let result = { isSuccess: false, data: {} }

        add(category)
            .then((reponse) => {
                console.log(reponse);

                result.isSuccess = true;

                props.handleAfterSave(result);

                console.log({ message: "The tutorial was created successfully!" });
            })
            .catch((e) => {
                console.log(e);
                result.isSuccess = false;
                props.handleAfterSave(result);
            });
    };

    const updateCategory = (columnName, value) => {
        setCategory({
            ...category,
            [columnName]: value
        });
    }
    const callbackFilterableOptionList = (data) => {
        setCategory({
            ...category,
            DepartmentIds: data.map((x) => x.id)
        });
    }

    return (
        <div>
            {console.log(datasource)}
            <FormSaveDialog show={props.modalShow}
                title={props.title}
                handleClose={props.handleClose}
                handleSave={saveHandler}>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"
                            value={category.name}
                            onChange=
                            {(e) => updateCategory('name', e.target.value)}
                            placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Active</Form.Label>
                        <Switch
                            checked={category.isActive}
                            onChange=
                            {(e) => updateCategory('isActive', e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Deparment</Form.Label>
                        <FilterableOptionList
                            datasource={datasource}
                            handleCallBack={callbackFilterableOptionList}
                        />
                    </Form.Group>
                </Form>
            </FormSaveDialog>
        </div>
    );
}

export default CategoryUpdate;