import { useState } from "react";
import useAuth from "./useAuth";


const API_URL = import.meta.env.VITE_API_URL; 

interface FetchOptions {
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: string;
    headers?: HeadersInit;
}

const useFetch = () => {

    const {auth, setAuth} = useAuth()

    const request = async <T>({ endpoint, method = "GET", body, headers = {}}: FetchOptions): Promise<T> => {
        headers["Content-Type"] = "application/json"
        headers["Authorization"] = `Bearer ${auth?.jwt}`;

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method,
                headers: headers,
                body,
                credentials: "include",
            });

            const responseData = await response.json().catch(() => null);

            if (!response.ok) {
                if (response.status === 401 ) {
                    const refreshResponse = await fetch(`${API_URL}/auth/new-token`, {
                        method: "GET",
                        credentials: "include",
                    });

                    if (refreshResponse.ok) {
                        const refreshData = await refreshResponse.json();
                        console.log("new access token: ", refreshData.jwt)
                        setAuth({email: refreshData.email, jwt: refreshData.jwt, role: "USER"})

                        
                        headers["Authorization"] = `Bearer ${refreshData.jwt}`;
                        const retryResponse = await fetch(`${API_URL}${endpoint}`, {
                            method,
                            headers: headers,
                            body,
                            credentials: "include",
                        });
                        const retryData = await retryResponse.json();
                        console.log(`retry data: ${retryData}`)
                        return retryData
                    }

                } else {
                    const errorMessage = responseData?.error || "An unexpected error occurred."
                    throw new Error(errorMessage)
                }
            } 

            return responseData
        } catch (error) {
            if (error instanceof TypeError) {
                throw new Error("An unexpected Error occurred.")
            }
            throw error
        }
    };

    return {request};
};

export default useFetch;
