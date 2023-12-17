import httpCommon from "../../common/http/shop-http-common";
import axios from "axios"
class ProductService {

    getProducts(inputParams) {
        return httpCommon.get('/product/get-products',
            {
                params: inputParams
            });
    }

    
    getListImagesOfProduct(inputParams) {
        return httpCommon.get('/product/get-list-images-of-product',
            {
                params: inputParams
            });
    }

    getFilterableOptionList(inputParams) {
        return httpCommon.get('/product/get-filterable-option-list',
            {
                params: inputParams
            });
    }


    update(id, data) {
        return httpCommon.put(`/product/edit-product/${id}`, data);
    }

    insert(data) {
        let http = axios.create(
            {
                baseURL: "https://localhost:7009",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': true,
                }
            }
        );

        return http.post(`/product/add-product`, data);
    }

    delete(data) {
        return httpCommon.post(`/product/delete-product`, data);
    }
}

export default new ProductService();