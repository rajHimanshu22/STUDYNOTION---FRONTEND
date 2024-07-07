import axios from "axios";

export const axiosInstance = axios.create({}); // iss create fun se sari type ki req kr skte hai (get,put,post, etc)

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,//body ke ander kya data bhejna hai wo pass kro
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}