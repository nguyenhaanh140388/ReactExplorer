import { RETRIEVE_DATA } from "./type"
import departmentService from "../../shop/dataservices/department.service"

export const fetchDepartmentAll = (payload) => async (dispatch) => {
    try {
        const res = await departmentService.getGetDepartments(payload);
        console.log(res);
        dispatch({
            type: RETRIEVE_DATA,
            payload: res.data.dataSource,
            paging: {
                hasNextPage: res.data.hasNextPage,
                hasPreviousPage: res.data.hasPreviousPage,
                pageIndex: res.data.pageIndex,
                pageSize: res.data.pageSize,
                totalCount: res.data.totalCount,
                totalPageCount: res.data.totalPageCount,
            },
            error: res.data.errors
        });
    } catch (error) {
        console.log(error)
    }
}

