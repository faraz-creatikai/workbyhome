const BASE_URL = "https://appapi.estateai.in/api"

export const API_ROUTES = {

ADMIN: {
    // 🔓 Public Routes
    SIGNUP: `${BASE_URL}/admin/signup`,
    LOGIN: `/login`,
    LOGOUT: `${BASE_URL}/admin/logout`,

    // 🔐 Protected Routes
    CHECK: `${BASE_URL}/admin/check`,

    // 👤 Admin Management
    CREATE: `${BASE_URL}/admin/create`,
    GET_ALL: `${BASE_URL}/admin/all`,
    GET_BY_ID: (id: String) => `${BASE_URL}/admin/${id}`,
    UPDATE_DETAILS: (id: String) => `${BASE_URL}/admin/${id}/details`,
    UPDATE_PASSWORD: (id: String) => `${BASE_URL}/admin/${id}/password`,
    DELETE: (id: String) => `${BASE_URL}/admin/${id}`,
  },
  }