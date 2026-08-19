import { CONFIG } from 'src/global-config';

import { ReceivingDecrepancyListView } from 'src/sections/receiving-decrepancy/view/receiving-decrepancy-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Reports | Receiving Decrepancy - ${CONFIG.appName}` };

export default function Page() {
  return <ReceivingDecrepancyListView title="Receiving Decrepancy" />;
}
