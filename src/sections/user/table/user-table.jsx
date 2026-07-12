import { DataGrid } from '@mui/x-data-grid';

import { UserTableColumns } from './user-table-columns';

const rows = [
  {
    id: 1,
    user_name: 'jdoe',
    full_name: 'John Doe',
    email_address: 'john.doe@example.com',
    role: 'Administrator',
    status: 'Active',
  },
  {
    id: 2,
    user_name: 'asmith',
    full_name: 'Alice Smith',
    email_address: 'alice.smith@example.com',
    role: 'Manager',
    status: 'Active',
  },
  {
    id: 3,
    user_name: 'bwilliams',
    full_name: 'Bob Williams',
    email_address: 'bob.williams@example.com',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 4,
    user_name: 'cjohnson',
    full_name: 'Chris Johnson',
    email_address: 'chris.johnson@example.com',
    role: 'Supervisor',
    status: 'Active',
  },
  {
    id: 5,
    user_name: 'egarcia',
    full_name: 'Emma Garcia',
    email_address: 'emma.garcia@example.com',
    role: 'User',
    status: 'Inactive',
  },
];

export function UserTable() {
  return (
    <DataGrid
      rows={rows}
      columns={UserTableColumns}
      rowHeight={66}
      checkboxSelection
      disableRowSelectionOnClick
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: {
          paginationModel: {
            page: 0,
            pageSize: 5,
          },
        },
      }}
    />
  );
}
