import apiCall from "./apiCall";

const subtractMinutes = (numOfMinutes: number, date: Date = new Date()): Date => {
  date.setMinutes(date.getMinutes() - numOfMinutes);
  return date;
};

/**
 * Token save in the local storage
 * @param {object} tokenObj
 */
export const setTokens = (tokenObj: {
  refresh: { token: string; expires: string };
  access: { token: string; expires: string };
}): void => {
  localStorage.setItem("refresh_token", tokenObj.refresh.token);
  localStorage.setItem("access_token", tokenObj.access.token);
  localStorage.setItem(
    "refresh_token_expires",
    subtractMinutes(1, new Date(tokenObj.refresh.expires)).toString()
  );
  localStorage.setItem(
    "access_token_expires",
    subtractMinutes(1, new Date(tokenObj.access.expires)).toString()
  );
};

/**
 * Check access token
 * @returns {string | false}
 */
export const checkAccessToken = (): string | false => {
  const access_token_expires = localStorage.getItem("access_token_expires");
  const access_token = localStorage.getItem("access_token");
  if (access_token_expires && access_token) {
    if (new Date(access_token_expires) > new Date()) {
      return access_token.replace(/['"]+/g, "");
    }
  }
  return false;
};

/**
 * Refresh auth token
 * @returns {string | false}
 */
export const refreshAuthToken = async (): Promise<string | false> => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;
    const res = await apiCall(false, "/auth/refresh-tokens", "POST", { refreshToken });
    if (res.ok) {
      await setTokens(res.data);
      return res.data.access.token.replace(/['"]+/g, "");
    }
    return false;
  } catch (err) {
    return false;
  }
};

/**
 * Logout
 * @returns {boolean}
 */
export const logout = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await apiCall(true, `/auth/logout`, "POST", {
      refreshToken,
    });

    if (response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("refresh_token_expires");
      localStorage.removeItem("access_token_expires");
      localStorage.removeItem("user");
      window.location.assign("/login");
      return true;
    } else {
      console.log(response.msg);
      return false;
    }
  } catch (err) {
    return false;
  }
};
