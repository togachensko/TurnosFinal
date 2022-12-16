import axios from "axios";

// DESCOMENTAR SEGUN LA URL DEL BACK
//const baseURL = "http://localhost:8000/";
const baseURL = "http://127.0.0.1:8000/";

export const httpGet = async (endpoint, logueado=true) => {
    let headers;
    if(logueado) {
        headers = {
            headers: {
                authorization:  "Bearer " + localStorage.getItem('token')
            }
        }
    } else {
        headers = {
            headers: {}
        }
    }
    return axios.get(baseURL + endpoint,headers).then((res) => {
        return res.data;
    })
}

export const httpPost = async (endpoint, data, logueado=true) => {
    let headers;
    if(logueado) {
        headers = {
            headers: {
                authorization:  "Bearer " + localStorage.getItem('token')
            }
        }
    } else {
        headers = {
            headers: {}
        }
    }
    return axios.post(baseURL + endpoint, data,headers )
}


export const httpDelete = async (endpoint, logueado=true) => {
    let headers;
    if(logueado) {
        headers = {
            headers: {
                authorization:  "Bearer " + localStorage.getItem('token')
            }
        }
    } else {
        headers = {
            headers: {}
        }
    }
    return axios.delete(baseURL + endpoint,headers).then((res) => {
        return res.data;
    })
}

export const httpPut = async (endpoint, data, logueado=true) => {
    let headers;
    if(logueado) {
        headers = {
            headers: {
                authorization:  "Bearer " + localStorage.getItem('token')
            }
        }
    } else {
        headers = {
            headers: {}
        }
    }
    return axios.put(baseURL + endpoint, data,headers).then((res) => {
        return res.data;
    })
}

export const httpPatch = async (endpoint, data, logueado=true) => {
    let headers;
    if(logueado) {
        headers = {
            headers: {
                authorization:  "Bearer " + localStorage.getItem('token')
            }
        }
    } else {
        headers = {
            headers: {}
        }
    }
    return axios.patch(baseURL + endpoint, data,headers).then((res) => {
        return res.data;
    })
}