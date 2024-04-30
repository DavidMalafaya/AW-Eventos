import axios from "axios";

const API_URL = "https://eventos-api-phi.vercel.app/api/auth/";

const register = (name, email, password) => {
	return axios
		.post(API_URL + "signup", {
			name,
			email,
			password,
		})
		.then((response) => {
			if (response.data.name) {
				localStorage.setItem("name", response.data.name);
				localStorage.setItem("token", response.data.token);
			}

			return response.data;
		});
};

const login = (email, password) => {
	return axios
		.post(API_URL + "signin", { email, password })
		.then((response) => {
			if (response.data.name) {
				localStorage.setItem("name", response.data.name);
				localStorage.setItem("token", response.data.token);
			}

			return response.data;
		});
};

const logout = () => {
	localStorage.clear();
};

const getCurrentUser = () => {
	return localStorage.getItem("name");
};

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser,
};

export default AuthService;
