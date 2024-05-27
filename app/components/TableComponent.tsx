"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Button } from "@mui/material";
import LoadingSpinner from "../loadingSpinner/loading";

function TableComponent({
  subCategory,
  handleOpenPopUp,
  otpStatus,
  isLoadingOTP,
}: any) {
  const [customeClick, setCustomeClick] = useState<any>(false);

  return (
    <>
      <Grid
        style={{ width: "100%", padding: "0 10px" }}
        container
        justifyContent={"center"}
        alignItems={"start"}
        maxWidth={"xl"}
        id="newGrid"
      >
        {subCategory &&
          subCategory?.data?.map((sub: any, index: any) => (
            <Grid
              item
              lg={sub.branch.length != 0 ? 12 : 3}
              md={sub.branch.length != 0 ? 12 : 4}
              sm={sub.branch.length != 0 ? 12 : 6}
              xs={12}
              key={sub.title}
            >
              {sub.branch.length != 0 ? (
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ textAlign: "center" }}>
                    <Image
                      onClick={() =>
                        setCustomeClick(customeClick === index ? null : index)
                      }
                      priority
                      src="/gold.png"
                      alt="logo"
                      width={150}
                      height={150}
                      style={{ marginBottom: "10px", cursor: "pointer" }}
                    />
                  </div>
                  {customeClick === index && (
                    <>
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
                      <Button
                        onClick={() => handleOpenPopUp(sub.offerName)}
                        sx={{
                          padding: "8px 35px",
                          borderRadius: "10px",
                          fontSize: "20px",
                          fontWeight: "bold",
                          border: "1px solid #54b5a6",
                          color: "black",
                          transition: "ease-in-out 0.3s",
                          backgroundColor: "white",
                          textDecoration: "none",
                          "&:hover": {
                            backgroundColor: "#54b5a6",
                            color: "white",
                          },
                        }}
                      >
                        {!isLoadingOTP ? (
                          "Redeem offer"
                        ) : (
                          <LoadingSpinner></LoadingSpinner>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div
                  className="card"
                  onClick={() =>
                    setCustomeClick(customeClick === index ? null : index)
                  }
                >
                  <div className="qr-code">
                    <Image
                      className="qr-img"
                      src={sub.imgName}
                      alt={sub.offerName}
                      width={80}
                      height={80}
                    />
                  </div>
                  {customeClick === index && (
                    <div className="card-content">
                      <h3>{sub.offerName}</h3>
                      <p>percentage: {sub.offerPercentage}</p>
                      <p> {sub.offerDescription}</p>
                    </div>
                  )}
                  {customeClick === index && otpStatus != "disable" && (
                    <Button
                      onClick={() => handleOpenPopUp(sub.offerName)}
                      sx={{
                        padding: "8px 35px",
                        borderRadius: "10px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        border: "1px solid #54b5a6",
                        color: "black",
                        transition: "ease-in-out 0.3s",
                        backgroundColor: "white",
                        textDecoration: "none",
                        "&:hover": {
                          backgroundColor: "#54b5a6",
                          color: "white",
                        },
                      }}
                    >
                      {!isLoadingOTP ? (
                        "Redeem offer"
                      ) : (
                        <LoadingSpinner></LoadingSpinner>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default TableComponent;
