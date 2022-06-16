import axios from "axios";

const baseURL = "http://localhost:8080";

const ERROR_MSG = "You don't have permission to execute current action"

const APIService = async (config:any) => {
    let defaultHeaders: any = {
        "Access-Control-Allow-Origin": "*",
    }

    const {auth, data, url, method} = config || {};

    if (auth) {
        const token = await localStorage.getItem('token');

        defaultHeaders = {
            ...defaultHeaders,
            "Authorization": "Bearer " + token
        }

    }

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: `${baseURL}${url}`,
            headers: defaultHeaders,
            data: data,
        })
            .then((data) => {
                if(url === '/auth/login'){
                    localStorage.setItem('token', data.headers.authorization)
                }
                resolve(data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && !error.response.data.includes(ERROR_MSG) && !url.includes('login')) {
                    localStorage.removeItem('token');
                }
                reject(error.response)
            })
    })

}

export default APIService;