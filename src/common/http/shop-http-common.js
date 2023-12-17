import axios from "axios"

export default axios.create(
    {
        baseURL: "https://localhost:7009",
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Origin': true,
        }
    }
);