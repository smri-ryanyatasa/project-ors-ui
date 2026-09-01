import { CONFIG } from 'src/global-config';

import { PlReceivingApprovalListView } from 'src/sections/pl-receiving-approval/view/pl-receiving-approval-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `PL Receiving Approval - ${CONFIG.appName}` };

export default function Page() {
  return <PlReceivingApprovalListView title="PL Receiving Approval" />;
}
