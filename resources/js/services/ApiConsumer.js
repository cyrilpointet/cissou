import axios from "axios";

const BASE_URL = "http://0.0.0.0/api/";

class ApiConsumer {
    constructor() {
        this.headers = {
            Accept: "application/json",
        };
    }

    setToken(token) {
        this.headers = {
            ...this.headers,
            Authorization: "Bearer " + token,
        };
    }

    removeToken() {
        delete this.headers.Authorization;
    }

    post(url, value) {
        return new Promise((resolve, reject) => {
            axios
                .post(BASE_URL + url, value, { headers: this.headers })
                .then((resp) => {
                    resolve(resp.data);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    put(url, value) {
        return new Promise((resolve, reject) => {
            axios
                .put(BASE_URL + url, value, { headers: this.headers })
                .then((resp) => {
                    resolve(resp.data);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    get(url) {
        return new Promise((resolve, reject) => {
            axios
                .get(BASE_URL + url, { headers: this.headers })
                .then((resp) => {
                    resolve(resp.data);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    delete(url, value) {
        return new Promise((resolve, reject) => {
            axios
                .delete(BASE_URL + url, { headers: this.headers, data: value })
                .then((resp) => {
                    resolve(resp.data);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }
}

const apiConsumer = new ApiConsumer();
export { apiConsumer as ApiConsumer };
