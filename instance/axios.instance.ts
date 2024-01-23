import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// Axios Interceptors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const isRetry = originalRequest?._isRetry;

    if (isUnauthorized && originalRequest && !isRetry) {
      originalRequest._isRetry = true;

      try {
        const { headers } = originalRequest;
        const [type, accessToken, refreshToken] =
          headers?.Authorization?.split(" ") ?? [];

        const { data, status } = await refreshTokenRequest(
          accessToken,
          refreshToken
        );

        if (status !== 200) {
          throw new Error("Error occurred from axios interceptors :)");
        }

        return instance.request(originalRequest);
      } catch (err) {
        console.log(`${err}! from axios interceptors :)`);
        return Promise.reject(err);
        // Consider handling the error here or rethrowing it
      }
    }
    return Promise.reject(error);
  }
);

const refreshTokenRequest = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/auth/auto-login`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken} ${refreshToken}` },
      }
    );
    return { data, status };
  } catch (error) {
    throw error;
  }
};

export default instance;
