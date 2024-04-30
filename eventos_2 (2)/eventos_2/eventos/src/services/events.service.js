import axios from "axios";

const API_URL = "https://eventos-api-phi.vercel.app/api/events/";

axios.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

const getAll = () => {
	return axios.get(API_URL);
};

const getById = (number) => {
	return axios.get(API_URL + number);
};

const createORupdate = (
	id,
	title,
	description,
	category,
	startDate,
	endDate,
	location,
	notes,
) => {
	if (id == null) {
		return create(
			title,
			description,
			category,
			startDate,
			endDate,
			location,
			notes,
		);
	} else {
		return update(
			id,
			title,
			description,
			category,
			startDate,
			endDate,
			location,
			notes,
		);
	}
};

const create = (
	title,
	description,
	category,
	startDate,
	endDate,
	location,
	notes,
) => {
	return axios.post(API_URL, {
		values: {
			title,
			description,
			category,
			startDate,
			endDate,
			location,
			notes,
		},
	});
};

const update = (
	id,
	title,
	description,
	category,
	startDate,
	endDate,
	location,
	notes,
) => {
	return axios.put(API_URL + id, {
		values: {
			title,
			description,
			category,
			startDate,
			endDate,
			location,
			notes,
		},
	});
};

const deleteEvent = (id) => {
	return axios.delete(API_URL + id);
};

const EventsService = {
	getAll,
	getById,
	createORupdate,
	create,
	update,
	deleteEvent,
};

export default EventsService;
