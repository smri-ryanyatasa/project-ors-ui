import { CONFIG } from 'src/global-config';

import { DashboardListView } from 'src/sections/dashboard/view/dashboard-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <DashboardListView title="Dashboard" />;
}
