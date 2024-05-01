import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import SubCategoryList from "./SubCategoryList";
import { allData, rows } from "./data";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReplayIcon from "@mui/icons-material/Replay";
import Grid from "@mui/material/Grid";

import Image from "next/image";
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
      {category && (
        <button
          className="successBtn"
          style={{
            width: "100%%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            margin: "10px 0",
          }}
          onClick={() => {
            setCategory(null);
            setName(null);
          }}
        >
          <span>كل العروض المتاحه</span>
          <ReplayIcon />
        </button>
      )}
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
          {rows.map((row, i) => (
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
              {(i += 1)}- {row.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {category && (
        <>
          <SubCategoryList
            category={category}
            resetTitle={resetTitle}
            nameX={nameX}
          />
        </>
      )}
      <Grid
        style={{ width: "100%", padding: "0 10px" }}
        container
        justifyContent={"center"}
        alignItems={"center"}
        maxWidth={"xl"}
        id="newGrid"
      >
        {!category &&
          allData.map((sub) => (
            <Grid
              item
              lg={sub.branch ? 12 : 3}
              md={sub.branch ? 12 : 4}
              sm={sub.branch ? 12 : 6}
              xs={12}
              key={sub.title}
            >
              {sub.branch ? (
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ textAlign: "center" }}>
                    <Image
                      src="/golds.png"
                      alt="logo"
                      width={150}
                      height={150}
                      style={{ marginBottom: "10px" }}
                    />
                  </div>
                  <TableContainer component={Paper} dir="rtl">
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                            align="right"
                          >
                            اسم الفرع
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            اشتراك جديد
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            تجديد اشتراك
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            اشتراك سنوى
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            اشتراك ربع سنوى
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sub.branch.map((row: any) => (
                          <TableRow
                            key={row.txt}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell
                              align="right"
                              style={{ fontSize: "16px" }}
                            >
                              {row.txt}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "16px" }}
                            >
                              {row.subscribe}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "16px" }}
                            >
                              {row.renewal}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "16px" }}
                            >
                              {row.year}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "16px" }}
                            >
                              {row.threeMonth}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ) : (
                <div className="card">
                  <div className="qr-code">
                    <Image
                      className="qr-img"
                      src={sub.img}
                      alt={sub.title}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <h3>{sub.title}</h3>
                    <p>percentage: {sub.percentage}</p>
                    <p>{sub.description}</p>
                  </div>
                </div>
              )}
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default CategoryList;
