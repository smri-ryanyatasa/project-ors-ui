import { CONFIG } from 'src/global-config';

import { RoleListView } from 'src/sections/role-permissions/view/role-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Maintenance | Role and Permissions - ${CONFIG.appName}` };

export default function Page() {
  return <RoleListView title="Role and Permissions" />;
}
