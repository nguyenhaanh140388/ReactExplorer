import httpCommon from "../common/http/http-common";
import axios from "axios"

class EmployeeService {
    getAll(documentName) {
        return httpCommon.get('/DummyData/GetDummyDataByName?payload=' + documentName);
    }

    getPagedEmployeeList(inputParams) {
        return httpCommon.get('/Employee/GetPagedEmployeeList',
            {
                params: inputParams
            });
    }

    update(id, data) {
        return httpCommon.put(`/Employee/UpdateEmployee/${id}`, data);
    }
}

export default new EmployeeService();