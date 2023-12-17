import httpCommon from "../../common/http/shop-http-common";
import axios from "axios"

class DepartmentService {

    getGetDepartments(inputParams) {
        return httpCommon.get('/department/get-departments',
            {
                params: inputParams
            });
    }

    update(id, data) {
        return httpCommon.put(`/department/edit-department/${id}`, data);
    }

    insert(data) {
        return httpCommon.post(`/department/add-department`, data);
    }

    delete(data) {
        return httpCommon.post(`/department/delete-department`, data);
    }
}

export default new DepartmentService();