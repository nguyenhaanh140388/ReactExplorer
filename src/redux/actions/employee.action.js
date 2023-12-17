import { ERROR, RETRIEVE_DATA, UPDATE_DATA, REFRESH_DATA } from "./type"
import employeeService from "../../dataservice/employee.service"

export const fetchAll = (document) => async (dispatch) => {
    try {
        const res = await employeeService.getAll(document);
        console.log(res);
        dispatch({
            type: RETRIEVE_DATA,
            payload: res.data.dataSource,
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            error: err
        });
    }
}

export const getPagedEmployeeList = (payload) => async (dispatch) => {
    try {
        const res = await employeeService.getPagedEmployeeList(payload);
        console.log('getPagedEmployeeList');
        console.log(res.data.dataSource);
        dispatch({
            type: REFRESH_DATA,
            payload: res.data.dataSource,
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            error: err
        });
    }
}


export const update = (id, data) => async (dispatch) => {
    try {
        const res = await employeeService.update(id, data);

        dispatch({
            type: UPDATE_DATA,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};