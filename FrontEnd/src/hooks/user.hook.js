import { userService } from "../services/services.js";

export const useLogin = async (data) => {
    try {
        const res = await userService.login(data);
        return res;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error("Invalid credentials");
        } else {
            throw new Error("Something went wrong");
        }
    }
}
