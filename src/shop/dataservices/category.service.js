import httpCommon from "../../common/http/shop-http-common";
import axios from "axios"

class CategoryService {

    getGetCategories(inputParams) {
        return httpCommon.get('/category/get-categories',
            {
                params: inputParams
            });
    }

    getFilterableOptionList(inputParams) {
        return httpCommon.get('/category/get-filterable-option-list',
            {
                params: inputParams
            });
    }

    
    update(id, data) {
        return httpCommon.put(`/category/edit-category/${id}`, data);
    }

    insert(data) {
        return httpCommon.post(`/category/add-category`, data);
    }

    delete(data) {
        return httpCommon.post(`/category/delete-category`, data);
    }
}

export default new CategoryService();