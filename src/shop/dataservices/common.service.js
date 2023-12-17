import httpCommon from "../../common/http/shop-http-common";

class CommonService {
    getFilterableOptionList(inputParams) {
        return httpCommon.get('/common/get-filterable-option-list',
            {
                params: inputParams
            });
    }
}

export default new CommonService();