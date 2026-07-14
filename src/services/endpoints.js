export const endpoints = {
  user: {
    list: '/api/users',
    create: '/api/users',
    detail: (id) => `/api/users/${id}`,
    update: (id) => `/api/users/${id}`,
    delete: (id) => `/api/users/${id}`,
    changePassword: (id) => `/api/users/${id}/change-password`,
    activityLog: (id) => `/api/users/${id}/activity-logs`,
  },
};
