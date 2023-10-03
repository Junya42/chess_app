import axios, { InternalAxiosRequestConfig } from 'axios';

const BASE_URL = "http://localhost:3000";

const authInterceptor = (req: InternalAxiosRequestConfig) => {
	
	const profile = sessionStorage.getItem("profile");

	if (profile) {
		const accessToken = JSON.parse(profile).accessToken;

		if (accessToken && req) {
			req.headers.Authorization = `Bearer ${accessToken}`;
		}
	}
	return req;
};


export const API = axios.create({
	baseURL: BASE_URL,
});

API.interceptors.request.use(authInterceptor);

export const handleApiError = async (error: any) => {
	try {
		const errorMessage =
			error.response?.data?.message || "An unexpected error occured.";
		const data = null;
		return { error: errorMessage, data };
	} catch (err) {
		throw new Error("An unexpected error occured.");
	}
}