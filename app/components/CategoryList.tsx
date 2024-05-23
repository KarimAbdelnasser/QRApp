import {
  Box,
  Button,
  LinearProgress,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import "../style/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers, getOffers } from "../redux/OffersSlice";
import { selectOtpStatus, selectScanCardNumber } from "../redux/scanSlice";
import { getOTPConfirmation, sendOTP, verifyOtp } from "../redux/otpSlice";
import { fetchCategories, getCategoriesC } from "../redux/categoriesSlice";
import Loading from "./Loading";

function CategoryList() {
  const [openPopUp, setOpenPopUp] = React.useState(false);

  const handleClosePopUp = () => setOpenPopUp(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [category, setCategory] = useState<any>(null);
  const [name, setName] = useState<any>(null);
  const [nameX, setNameX] = useState<any>(null);
  const [customeClick, setCustomeClick] = useState<any>(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<any>();
  const offers = useSelector(getOffers);
  const otpConfirmation = useSelector(getOTPConfirmation);
  const CategoriesC = useSelector(getCategoriesC);
  const cardNumber = useSelector(selectScanCardNumber);
  const isLoadingOffers = useSelector((state: any) => state.offers.isLoading);
  const isLoadingCategories = useSelector(
    (state: any) => state.categories.isLoading
  );
  const isLoadingOTP = useSelector((state: any) => state.otp.isLoading);
  const isLoadingButton = useSelector(
    (state: any) => state.otp.isLoadingButton
  );

  const otpStatus = useSelector(selectOtpStatus);
  const [otpValue, setOtpValue] = useState<any>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const resetTitle = (e: any) => {
    setNameX(e);
  };

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenPopUp = (brand: any) => {
    setOpenPopUp(true);
    //send OTP
    dispatch(sendOTP(brand));
  };

  const otpConfirm = () => {
    dispatch(verifyOtp(otpValue));
  };

  useEffect(() => {
    if (otpConfirmation) {
      setOpenPopUp(false);
    }
  }, [otpConfirmation]);

  const waterMarkFun = (watermark: string) => {
    const pos = [
      "center",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
    ];
    return (
      <Box>
        {pos.map((loc: any, index: any) => {
          return (
            <Box key={index} className={`watermark ${loc}`}>
              {watermark}
            </Box>
          );
        })}
      </Box>
    );
  };
  console.log(offers);

  return (
    <>
      {!isLoadingOffers && !isLoadingCategories ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {waterMarkFun(cardNumber)}
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
              {CategoriesC?.map((row: any, index: any) => (
                <MenuItem
                  key={row.name + index}
                  onClick={() => {
                    setCategory(
                      offers?.filter(
                        (subCat: any) =>
                          subCat.categoryNumber === row.categoryNumber
                      )
                    );
                    setName(row.name);
                    resetTitle(null);
                    setAnchorEl(null);
                  }}
                >
                  {(index += 1)}- {row.category}
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
                handleOpenPopUp={handleOpenPopUp}
                otpStatus={otpStatus}
                isLoadingOTP={isLoadingOTP}
              />
            </>
          )}
          <Grid
            style={{ width: "100%", padding: "0 10px" }}
            container
            justifyContent={"center"}
            alignItems={"start"}
            maxWidth={"xl"}
            id="newGrid"
          >
            {!category &&
              offers.map(
                (sub: any, index: any) =>
                  sub.branch.length != 0 && (
                    <Grid
                      item
                      lg={sub.branch.length != 0 ? 12 : 3}
                      md={sub.branch.length != 0 ? 12 : 4}
                      sm={sub.branch.length != 0 ? 12 : 6}
                      xs={12}
                      key={sub.title}
                    >
                      {
                        <div style={{ marginBottom: "10px" }}>
                          <div style={{ textAlign: "center" }}>
                            <Image
                              onClick={() =>
                                setCustomeClick(
                                  customeClick === index ? null : index
                                )
                              }
                              src="/golds.png"
                              alt="logo"
                              width={150}
                              height={150}
                              style={{
                                marginBottom: "10px",
                                cursor: "pointer",
                              }}
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
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
                                        align="right"
                                      >
                                        اسم الفرع
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
                                      >
                                        اشتراك جديد
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
                                      >
                                        تجديد اشتراك
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
                                      >
                                        اشتراك سنوى
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
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
                              {sub.usersType != "A" && (
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
                                    "Activate Offer"
                                  ) : (
                                    <Loading Circular={true}></Loading>
                                  )}
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      }
                    </Grid>
                  )
              )}
            {!category &&
              offers.map(
                (sub: any, index: any) =>
                  sub.branch.length == 0 && (
                    <Grid
                      item
                      lg={sub.branch.length != 0 ? 12 : 3}
                      md={sub.branch.length != 0 ? 12 : 4}
                      sm={sub.branch.length != 0 ? 12 : 6}
                      xs={12}
                      key={sub.title}
                    >
                      {
                        <div
                          className="card"
                          onClick={() =>
                            setCustomeClick(
                              customeClick === index ? null : index
                            )
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
                              <p>percentage: {sub.offerPercentage}%</p>
                              <p>{sub.offerDescription}</p>
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
                                "Activate Offer"
                              ) : (
                                <Loading Circular={true}></Loading>
                              )}
                            </Button>
                          )}
                        </div>
                      }
                    </Grid>
                  )
              )}
          </Grid>
          <Modal open={openPopUp} onClose={handleClosePopUp}>
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 350,
                borderRadius: "24px",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              {!isLoadingOTP ? (
                <>
                  <Typography
                    sx={{ mb: "1rem", textAlign: "center" }}
                    variant="h6"
                    component="h2"
                  >
                    Kindly, Enter sent OTP
                  </Typography>
                  <TextField
                    type="tel"
                    id="outlined-basic"
                    label="OTP"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={otpValue}
                    onChange={(e) => {
                      setOtpValue(e.target.value);
                    }}
                  />
                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      sx={{
                        mt: "10px",
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
                      onClick={otpConfirm}
                    >
                      {!isLoadingButton ? (
                        "Confirm"
                      ) : (
                        <Loading Circular={true}></Loading>
                      )}
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography
                    sx={{ mb: "1rem", textAlign: "center" }}
                    variant="h6"
                    component="h2"
                  >
                    OTP is being sent...
                    <Typography
                      sx={{ mb: "1rem", textAlign: "center" }}
                      variant="h6"
                      component="h2"
                    ></Typography>
                    <Loading Circular={true}></Loading>
                  </Typography>
                </>
              )}
            </Box>
          </Modal>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}

export default CategoryList;
