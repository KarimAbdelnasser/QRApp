import { Button, Menu, MenuItem, TableContainer } from "@mui/material";
import React, { useState } from "react";
import TableComponent from "./TableComponent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function SubCategoryList({ category, resetTitle, nameX }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [subCategory, setSubCategory] = useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "#54b5a6", fontSize: "30px" }}
        >
          {nameX ? nameX : "الماركة"}
          <KeyboardArrowDownIcon />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {category.arr.map((sub: any, i: any) => (
            <MenuItem
              key={i}
              onClick={() => {
                setSubCategory(
                  category.arr.filter(
                    (subCat: any) => subCat.title === sub.title
                  )[0]
                );
                resetTitle(sub.title);
                setAnchorEl(null);
              }}
            >
              {sub.title}
            </MenuItem>
          ))}
        </Menu>
        <TableContainer />
      </div>
      {subCategory && <TableComponent subCategory={subCategory} />}
    </>
  );
}

export default SubCategoryList;
