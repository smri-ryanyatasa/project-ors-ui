export const endpoints = {
  user: {
    list: '/api/users',
    create: '/api/users',
    detail: (id) => `/api/users/${id}`,
    update: (id) => `/api/users/${id}`,
    delete: (id) => `/api/users/${id}`,
    changePassword: (id) => `/api/users/${id}/change-password`,
    activityLog: (id) => `/api/users/${id}/user-history`,
    bulkUpload: '/api/users/bulk-upload',
    csvExport: '/api/users/csv-export',
    excelExport: '/api/users/excel-export',
    branches: '/api/users/branches',
  },
  rolePermission: {
    list: '/api/role-permissions',
    create: '/api/role-permissions',
    update: (id) => `/api/role-permissions/${id}`,
    delete: (id) => `/api/role-permissions/${id}`,
    getMenus: '/api/role-permissions/menus',
  },
};
