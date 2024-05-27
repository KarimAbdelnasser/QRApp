import {
  Button,
  Menu,
  MenuItem,
  Grid,
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SubCategoryList from "./SubCategoryList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import ReplayIcon from "@mui/icons-material/Replay";
import { fetchCategories } from "../redux/categoriesSlice";
import { fetchOffers } from "../redux/OffersSlice";
import { Offers } from "../redux/OffersSlice";
import LoadingSpinner from "../loadingSpinner/loading";
import Image from "next/image";
import { OtpStatus, ScanCardNumber } from "../redux/scanSlice";
import { getOTPConfirmation, sendOTP, verifyOtp } from "../redux/otpSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../style/style.scss";
const CategoryList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [category, setCategory] = useState<any>(null);
  const [name, setName] = useState<any>(null);
  const [nameX, setNameX] = useState<any>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const [otpValue, setOtpValue] = useState<string | null>("");
  const [otpOfferName, setOtpOfferName] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<any>();
  const otpConfirmation = useSelector(getOTPConfirmation);
  const cardNumber = useSelector(ScanCardNumber);
  const otpStatus = useSelector(OtpStatus);
  const [customeClick, setCustomeClick] = useState<any>(false);

  const offers = useSelector(Offers);

  const isLoading = useSelector((state: any) => state.offers.isLoading);

  const categories =
    useSelector((state: any) => state.categories.categories) || "";
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchOffers());
  }, [dispatch]);

  useEffect(() => {
    if (otpConfirmation) {
      setOpenPopUp(false);
    }
  }, [otpConfirmation]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const resetTitle = (e: any) => {
    setNameX(e);
  };

  const handleCardClick = (id: string) => {
    setSelectedCardId(id === selectedCardId ? null : id);
  };

  const handleOpenPopUp = (offerName: string) => {
    setOtpOfferName(offerName);
    setOpenPopUp(true);
    dispatch(sendOTP(offerName));
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const otpConfirm = () => {
    dispatch(verifyOtp(otpValue));
  };

  const Watermark = ({ number }: { number: string }) => {
    const watermarks = Array.from({ length: 100 }).map((_, index) => (
      <div
        key={index}
        style={{
          transform: "rotate(-45deg)",
          whiteSpace: "nowrap",
          fontSize: "5vw",
          opacity: 0.1,
          color: "rgba(128, 128, 128, 0.8)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {number}
      </div>
    ));

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(15, 1fr)",
          gridTemplateRows: "repeat(15, 1fr)",
          zIndex: 1,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {watermarks}
      </div>
    );
  };

  return (
    <>
      <Watermark number={cardNumber || ""} />
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
              width: "100%",
              maxWidth: "270px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
            }}
            onClick={() => {
              setCategory(null);
              setName(null);
              setFilteredSubCategories([]);
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
            {categories?.data?.map((row: any, index: any) => (
              <MenuItem
                key={row.categoryNumber + index}
                onClick={() => {
                  setCategory(row);
                  setName(row.category);
                  setAnchorEl(null);
                  const subCategories = offers?.data?.filter(
                    (offer: any) => offer.categoryNumber === row.categoryNumber
                  );
                  setFilteredSubCategories(subCategories);
                }}
              >
                {index + 1}- {row.category}
              </MenuItem>
            ))}
          </Menu>
        </div>
        {category && (
          <SubCategoryList
            category={category}
            nameX={name}
            handleOpenPopUp={handleOpenPopUp}
            otpStatus={otpStatus}
          />
        )}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Grid
              style={{ width: "100%", padding: "0 10px" }}
              container
              justifyContent={"center"}
              alignItems={"start"}
              maxWidth={"xl"}
              id="newGrid1"
            >
              {!category &&
                offers?.data?.map(
                  (sub: any, index: any) =>
                    sub.branch.length !== 0 && (
                      <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        key={sub.title + index}
                      >
                        <div style={{ marginBottom: "10px" }}>
                          <div style={{ textAlign: "center" }}>
                            <Image
                              onClick={() =>
                                setCustomeClick(
                                  customeClick === index ? null : index
                                )
                              }
                              priority
                              src="/gold.png"
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
                                    {sub.branch.map((row: any, index: any) => (
                                      <TableRow
                                        key={row.txt + index}
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
                            </>
                          )}
                        </div>
                      </Grid>
                    )
                )}
            </Grid>
            <Grid
              container
              spacing={3}
              id="newGrid2"
              justifyContent="center"
              style={{ width: "100%", padding: "0 10px" }}
            >
              {!category &&
                offers?.data?.map((offer: any, index: any) => (
                  <Grid
                    item
                    lg={3}
                    md={4}
                    sm={6}
                    id="newGrid3"
                    xs={12}
                    key={offer._id + index}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div
                      className="card"
                      onClick={() => handleCardClick(offer._id)}
                    >
                      <div className="qr-code">
                        <Image
                          className="qr-img"
                          src={offer.imgName}
                          alt={offer.offerName}
                          width={150}
                          height={150}
                        />
                      </div>
                      <div className="offer-img"></div>
                      <div style={{ textAlign: "center" }}>
                        <h3>{offer.offerName}</h3>
                        {selectedCardId === offer._id && (
                          <>
                            <p>Percentage: {offer.offerPercentage}%</p>
                            {otpStatus !== "disable" && (
                              <Button
                                onClick={() => handleOpenPopUp(offer.offerName)}
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
                                Redeem offer
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </Grid>
                ))}
            </Grid>
            {category && (
              <Grid
                container
                spacing={3}
                justifyContent="center"
                style={{ width: "100%", padding: "0 10px" }}
              >
                {filteredSubCategories.map((subcat, index) => (
                  <Grid
                    item
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    key={subcat._id + index}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div
                      className="card"
                      onClick={() => handleCardClick(subcat._id)}
                    >
                      <div className="qr-code">
                        <Image
                          className="qr-img"
                          src={subcat.imgName}
                          alt={subcat.offerName}
                          width={150}
                          height={150}
                        />
                      </div>
                      <div className="offer-img"></div>
                      <div style={{ textAlign: "center" }}>
                        <h3>{subcat.offerName}</h3>
                        {selectedCardId === subcat._id && (
                          <>
                            <p>Percentage: {subcat.offerPercentage}%</p>

                            {otpStatus !== "disable" && (
                              <Button
                                onClick={() =>
                                  handleOpenPopUp(subcat.offerName)
                                }
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
                                Redeem Offer
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
        <Modal open={openPopUp} onClose={handleClosePopUp}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              borderRadius: "24px",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              sx={{ mb: "1rem", textAlign: "center" }}
              variant="h6"
              component="h2"
            >
              Enter OTP for {otpOfferName}
            </Typography>
            <TextField
              type="tel"
              id="outlined-basic"
              label="OTP"
              variant="outlined"
              sx={{ width: "100%" }}
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
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
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CategoryList;
