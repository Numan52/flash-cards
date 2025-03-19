import useFetch from "./useFetch";
import useAuth from "./useAuth";

interface AuthResponse {
    email: string;
    jwt: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
}

export const useUserApi = () => {
    
    const { request } = useFetch();

    const loginUser = async (email: string, password: string) => {
        const data = await request<AuthResponse>({
            endpoint: "/auth/login",
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        return data;
    };

    const registerUser = async (firstName: string, lastName: string, username: string, password: string, email: string) => {
        return request<AuthResponse>({
            endpoint: "/auth/register",
            method: "POST",
            body: JSON.stringify({ firstName, lastName, email, username, password }),
        });
    };

    const getUser = async (id: string) => {
        return request<User>({
            endpoint: `/user?id=${id}`,
        });
    };

    const getUserId = async (username: string) => {
        return request<{ id: string }>({
            endpoint: `/user/id?username=${username}`,
        });
    };


    const logout = async () => {
        return request({
            endpoint: `/auth/logout`,
            method:"POST"
        });
    };

    const refreshToken = async () => {
        const data = await request<AuthResponse>({
            endpoint: "/auth/new-token",
        });
        return data;
    };

    return { loginUser, registerUser, getUser, getUserId, refreshToken, logout};
};