import React, { useMemo, useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form';
import FormSaveDialog from '../../../components/dialog/formsave-dialog';
import {
    Switch
} from '@mui/material';

import departmentService from "../../dataservices/department.service"

import { RETRIEVE_DATA, UPDATE_DATA, CREATE_DATA } from "../../../redux/actions/type"

function DepartmentUpdate(props) {
    const dispatch = useDispatch();
    const apiReducer = useSelector(state => state.apiReducer);

    const [addDepartment, setAddDepartment] = useState({
        name: '',
        // dateOfCreateFrom: '',
        // dateOfCreateTo: '',
        // dateOfUpdateFrom: '',
        // dateOfUpdateTo: '',
        isActive: true
        // isSearch: false,
    });

    const clearState = () => {
        setAddDepartment({
            ...addDepartment,
            name: '',
            isActive: true
        });
    };

    const add = async (data) => {
        try {
            const res = await departmentService.insert(data);

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
        console.log(addDepartment);
        let result = { isSuccess: false, data: {} }

        add(addDepartment)
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

    const updateDepartmentObject = (columnName, value) => {
        setAddDepartment({
            ...addDepartment,
            [columnName]: value
        });
    }

    return (
        <FormSaveDialog show={props.modalShow}
            title={props.title}
            handleClose={props.handleClose}
            handleSave={saveHandler}>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                        value={addDepartment.name}
                        onChange=
                        {(e) => updateDepartmentObject('name', e.target.value)}
                        placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Active</Form.Label>
                    <Switch
                        checked={addDepartment.isActive}
                        onChange=
                        {(e) => updateDepartmentObject('isActive', e.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Form.Group>
            </Form>
        </FormSaveDialog>
    );
}

export default DepartmentUpdate;