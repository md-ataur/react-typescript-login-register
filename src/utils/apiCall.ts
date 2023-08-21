import { checkAccessToken, refreshAuthToken } from "./Auth";

/**
 * Interface declared
 */
interface ApiResponse {
  ok: boolean;
  data?: any;
  msg: string;
}

// Base url
const baseUrl: string = import.meta.env.VITE_BASE_URL as string;

/**
 * Login check
 * @returns
 */
const loginCheck = async (): Promise<string | boolean> => {
  const token = await checkAccessToken();
  if (token) return token;
  const isRefreshed = await refreshAuthToken();
  if (isRefreshed) return isRefreshed;
  return false;
};

/**
 * Main api
 * @param {*} isLoginRequired
 * @param {*} endPoint
 * @param {*} method
 * @param {*} data
 * @returns
 */
const apiCall = async (
  isLoginRequired: boolean,
  endPoint: string,
  method: string = "GET",
  data: any = {}
): Promise<ApiResponse> => {
  try {
    let token: string | boolean = "";
    if (isLoginRequired) {
      token = await loginCheck();
    }
    const response = await fetch(`${baseUrl}${endPoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: method === "GET" ? null : JSON.stringify(data),
    });

    if (response.ok) {
      // Check if the response is expected to be in JSON format
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const res = await response.json();
        return {
          ok: true,
          data: res.data,
          msg: res.message,
        };
      } else {
        // Return an empty response if the server did not return JSON
        return {
          ok: true,
          data: null,
          msg: "",
        };
      }
    } else {
      const res = await response.json();
      return {
        ok: false,
        msg: res.message,
      };
    }
  } catch (error: any) {
    return {
      ok: false,
      msg: error.message,
    };
  }
};

export default apiCall;
