import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import SubCategoryList from "./SubCategoryList";
import { rows } from "./data";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
function CategoryList() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [category, setCategory] = useState<any>(null);
  const [name, setName] = useState<any>(null);
  const [nameX, setNameX] = useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const resetTitle = (e: any) => {
    setNameX(e);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "#54b5a6", fontSize: "30px" }}
        >
          {name ? name : "اختر الفئة"}
          <KeyboardArrowDownIcon />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {rows.map((row) => (
            <MenuItem
              key={row.name}
              onClick={() => {
                setCategory(
                  rows.filter((subCat) => subCat.name === row.name)[0]
                );
                setName(row.name);
                resetTitle(null);
                setAnchorEl(null);
              }}
            >
              {row.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {category && (
        <SubCategoryList
          category={category}
          resetTitle={resetTitle}
          nameX={nameX}
        />
      )}
    </div>
  );
}

export default CategoryList;
