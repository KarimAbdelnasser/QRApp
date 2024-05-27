import React, { useState } from "react";
import TableComponent from "./TableComponent";

function SubCategoryList({ category, resetTitle }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>{category && <TableComponent subCategory={category} />}</>;
}

export default SubCategoryList;
