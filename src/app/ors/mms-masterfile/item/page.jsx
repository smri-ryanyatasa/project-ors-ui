import { CONFIG } from 'src/global-config';

import { ItemListView } from 'src/sections/item/view/item-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `MMS Masterfile | Item - ${CONFIG.appName}` };

export default function Page() {
  return <ItemListView title="Item Masterfile" />;
}
