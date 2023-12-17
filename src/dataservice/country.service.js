import httpCommon from "../common/http/http-common";

class CountryDataService {
    getAll() {
        return httpCommon.get('/country/get-countries?Page=1&Take=10');
    }
}

export default new CountryDataService();