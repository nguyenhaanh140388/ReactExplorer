import { ERROR, RETRIEVE_DATA, UPDATE_DATA, REFRESH_DATA, CREATE_DATA,DELETE_DATA } from "../redux/actions/type"

const initialState = {
    data: [],
    type: '',
    isfresh: false,
    paging:
    {
        hasNextPage: false,
        hasPreviousPage: false,
        message: "",
        pageIndex: 1,
        pageSize: 10,
        succeeded: true,
        totalCount: 0,
        totalPageCount: 0
    }
};

export default function apiReducer(apiResult = initialState, action) {
    const { type, payload, error, paging } = action;
    console.log(payload);
    switch (type) {
        case DELETE_DATA:
            return apiResult;
        case CREATE_DATA:
            return [...apiResult, payload];
        case RETRIEVE_DATA:
            return {
                // ...apiResult,
                isfresh: false,
                data: payload,
                type: RETRIEVE_DATA,
                paging: paging
            }
        case REFRESH_DATA:
            console.log(payload);
            return {
                // ...apiResult,
                isfresh: false,
                data: payload,
                type: REFRESH_DATA,
                // paging:
                // {
                //     hasNextPage: payload.hasNextPage,
                //     hasPreviousPage: payload.hasPreviousPage,
                //     message: payload.message,
                //     pageIndex: payload.pageIndex,
                //     pageSize: payload.pageSize,
                //     succeeded: payload.succeeded,
                //     totalCount: payload.totalCount,
                //     totalPageCount: payload.totalPageCount
                // }
            }
        case UPDATE_DATA:
            console.log(payload);
            return apiResult.data.map((item) => {
                if (item.id === payload.id) {
                    return {
                        ...item,
                        ...payload,
                    };
                } else {
                    return item;
                }
            });
        case ERROR:
            return {
                ...apiResult,
                error: error,
                type: ERROR,
            }
        default:
            return apiResult;
    }
};
