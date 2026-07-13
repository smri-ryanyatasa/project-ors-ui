export const endpoints = {
  user: {
    list: '/api/users',
    create: '/api/users',
    detail: (id) => `/api/users/${id}`,
    update: (id) => `/api/users/${id}`,
    delete: (id) => `/api/users/${id}`,
    changePassword: (id) => `/users/${id}/change-password`,
  },
};
