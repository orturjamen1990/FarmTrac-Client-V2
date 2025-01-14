import axios from "./axios";

let config = {
  headers: {
    tenant: "root",
  },
};

function login(loginRequest: any) {
  const url = "/Auth/login";
  return axios.post(url, loginRequest, config);
}

function me() {
  const url = "/Auth/me";
  return axios.get(url, config);
}

function logout() {
  const url = "/Auth/logout";
  return axios.post(url, config);
}

export default {
  login,
  me,
  logout,
};
