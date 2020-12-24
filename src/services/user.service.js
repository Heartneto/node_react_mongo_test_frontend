import http from "../http-common";

class UserDataService {
    getAll() {
        return http.get("/");
    }

    get(id){
        return http.get(`/${id}`);
    }

    new(data){
        return http.post("/", data);
    }

    update(id, data){
        return http.put(`/${id}`, data);
    }

    delete(id){
        return http.delete(`/${id}`);
    }
}

export default new UserDataService();