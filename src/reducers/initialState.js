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

export default initialState;