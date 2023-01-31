import API from './baseApi';
/**
 * Get Items
 */
export const getAllItems = async () => {
	try {
		const response = await API.get('/item');

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString() ||
			error.request;
		throw new Error(message);
	}
};

export const postItem = async (data) => {
	try {
		const response = await API.post('/item', data);

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString() ||
			error.request;
		throw new Error(message);
	}
};

export const editItem = async ({ ItemID, ...data }) => {
	try {
		const response = await API.patch(`/item/${ItemID}`, data);

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString() ||
			error.request;
		throw new Error(message);
	}
};

// Delete
export const deleteItem = async ({ ItemID }) => {
	try {
		const response = await API.delete(`/item/${ItemID}`);

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString() ||
			error.request;
		throw new Error(message);
	}
};

export const getLastID = async () => {
	try {
		const response = await API.get(`/item/lastID`);

		return response.data;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString() ||
			error.request;
		throw new Error(message);
	}
};
