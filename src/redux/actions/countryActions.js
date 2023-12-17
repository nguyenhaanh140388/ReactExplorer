import { ERROR, RETRIEVE_DATA } from "./type"
import countryService from "../../dataservice/country.service"

export const retrieveCountry = () => async (dispatch) => {
    try {
        const res = await countryService.getAll();
        dispatch({
            type: RETRIEVE_DATA,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            error: err
        });
    }
}