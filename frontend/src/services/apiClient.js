import axios from "axios";

class ApiClient {

    constructor(remoteHostUrl) {

        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "life_tracker_token";
    }

    //utility method...
    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;
        const headers = {
            "Content-Type": "application/json"
        }
        if(this.token){
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        try {
            const res = await axios({ url, method, data, headers }); //passing config methods to axios
            return { data: res.data, error: null };
        } catch (error) {
            const errorResponse = error?.response?.data?.error?.message;
            return { data: null, error: errorResponse || String(error) };
        }
    }

    async listExercises() {
        return await this.request({ endpoint: "exercise", method: "GET" });
    }

    async createExercise(details) { 
        return await this.request({ endpoint: "exercise/create/", method: "POST", data: details });
    }

    async listNutrition() {
        return await this.request({ endpoint: "nutrition", method: "GET" });
    }

    async recordNutrition(details) { 
        return await this.request({ endpoint: "nutrition/record/", method: "POST", data: details });
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    //helps persist the logged in user
    async fetchUserFromToken() {
        return await this.request({ endpoint: "auth/me/", method: "GET" });
    }

    async loginUser(credentials) { 
        return await this.request({ endpoint: "auth/login/", method: "POST", data: credentials });
    }

    async signupUser(credentials) { 
        return await this.request({ endpoint: "auth/register/", method: "POST", data: credentials }) ;
    }

    async logoutUser() { 
        this.token = null;
        localStorage.setItem(this.tokenName, "");
    }
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001");
