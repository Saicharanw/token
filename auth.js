import api from "./axios";

// ✅ Signup function
export const signup = async (userData) => {
  if (!userData.email || !userData.password || !userData.name) {
    throw new Error("Name, email, and password are required");
  }

  try {
    const response = await api.post("/auth/register", userData);
    const { accessToken, refreshToken, name, email } = response.data;

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("name", name || "");
      localStorage.setItem("email", email || "");
    }

    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error.response?.data?.message || error.message;
  }
};

// ✅ Login function
export const login = async (credentials) => {
  if (!credentials.email || !credentials.password) {
    throw new Error("Email and password are required");
  }

  try {
    const response = await api.post("/auth/login", credentials);
    const { accessToken, refreshToken, name, email } = response.data;

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("name", name || "");
      localStorage.setItem("email", email || "");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data?.message || error.message;
  }
};

// ✅ Refresh token function
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await api.post("/auth/refresh", { refreshToken });
    const { accessToken } = response.data;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    return accessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error.response?.data?.message || error.message;
  }
};
