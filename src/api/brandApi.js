import API from './baseApi';
/**
 * Get Client
 */
export const getAllBrands = async () => {
	try {
		const response = await API.get('/brand');

		return response.data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const createBrand = async (data) => {
	try {
		const response = await API.post('/brand', data);

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

// Edit
export const editBrand = async ({ BrandID, ...data }) => {
	try {
		const response = await API.patch(`/brand/${BrandID}`, data);

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
export const deleteBrand = async ({ BrandID }) => {
	try {
		const response = await API.delete(`/brand/${BrandID}`);

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
export const getLastID = async () => {
	try {
		const response = await API.get(`/brand/lastID`);

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
