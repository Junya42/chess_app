import { API, handleApiError } from "./utils";

export async function ApiSignin(values: any) {

	try {
		const { data } = await API.post(
			"/auth/login",
			values,
			{ withCredentials: true}
			);
			sessionStorage.setItem("access_token", JSON.stringify(data.access_token));
			sessionStorage.setItem("username", values.username);
			window.location.reload();
		} catch (err) {
			return handleApiError(err);
		}
}

export async function ApiSignup(values: any) {

	try {
		const { data } = await API.post(
			"/auth/signup",
			values,
			{ withCredentials: true}
			);
			sessionStorage.setItem("access_token", JSON.stringify(data.access_token));
			sessionStorage.setItem("username", values.username);
			window.location.reload();
		} catch (err) {
			return handleApiError(err);
		}
}