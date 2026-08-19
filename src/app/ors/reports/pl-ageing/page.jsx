import { CONFIG } from 'src/global-config';

import { PlAgeingListView } from 'src/sections/pl-ageing/view/pl-ageing-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Reports | PL Ageing - ${CONFIG.appName}` };

export default function Page() {
  return <PlAgeingListView title="PL Ageing Report" />;
}
