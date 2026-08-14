import { CONFIG } from 'src/global-config';

import { POLogsListView } from 'src/sections/po-logs/view/po-logs-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `PO Logs - ${CONFIG.appName}` };

export default function Page() {
  return <POLogsListView title="PO Logs" />;
}
