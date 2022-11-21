import SHOP_DATA from "../../shop-data.json";

import React from "react";

export default function ShopComponent() {
  return <div>{SHOP_DATA.map(({ id, name }) => {})}</div>;
}
