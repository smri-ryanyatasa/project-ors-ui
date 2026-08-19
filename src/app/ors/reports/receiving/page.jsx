import { CONFIG } from 'src/global-config';

import { ReceivingListView } from 'src/sections/receiving/view/receiving-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Reports | Receiving - ${CONFIG.appName}` };

export default function Page() {
  return <ReceivingListView title="Receiving Report" />;
}
