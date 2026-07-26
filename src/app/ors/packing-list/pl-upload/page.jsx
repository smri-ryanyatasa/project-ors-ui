import { CONFIG } from 'src/global-config';

import { PlUploadListView } from 'src/sections/pl-upload/view/pl-upload-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Packing List | PL Upload - ${CONFIG.appName}` };

export default function Page() {
  return <PlUploadListView title="PL Upload" />;
}
