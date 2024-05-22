"use client";
import Head from "next/head";
import { Box, Typography } from "@mui/material";
import { CheckCircleOutline, Close } from "@mui/icons-material";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { scan, selectScanResult } from "../redux/scanSlice";
import Loading from "../components/Loading";

const ValidPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>valid</title>
      </Head>
      <Suspense fallback={<Loading></Loading>}>
        <ValidComponent />
      </Suspense>
    </div>
  );
};

const ValidComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<any>();
  const scanResult = useSelector(selectScanResult);
  const isLoading = useSelector((state: any) => state.scan.isLoading);
  const { error, errorData, errorStatus } = useSelector(
    (state: any) => state.scan
  );

  useEffect(() => {
    const userId = searchParams.get("userId");
    if (userId) {
      dispatch(scan(userId));
    }
  }, [dispatch, searchParams]);

  return (
    <>
      {!isLoading && Object.keys(scanResult).length > 0 && !errorStatus ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {!errorStatus && scanResult.responseCode == 200 ? (
            <Box
              m={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <h1 style={{ color: "black", direction: "rtl" }}>{`${
                scanResult.responseMessage
              } ${
                scanResult.activeOfferBrand
                  ? scanResult.activeOfferBrand +
                    (scanResult.sign == false
                      ? " يرجى اعادة ادخال ال OTP مرة اخري"
                      : " و الكارت صالح")
                  : ""
              }`}</h1>
              {scanResult.sign == true ? (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    backgroundColor: "#54b5a6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "15px 0",
                  }}
                >
                  <CheckCircleOutline
                    style={{ fontSize: 100, color: "white" }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    backgroundColor: "red",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "15px 0",
                  }}
                >
                  <Close style={{ fontSize: 100, color: "white" }} />
                </div>
              )}

              <Link href="/pin" rel="canonical" className="successBtn">
                التالى
              </Link>
            </Box>
          ) : (
            <Box
              m={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <h1 style={{ color: "black", direction: "rtl" }}>{`${
                scanResult.responseMessage
              } ${
                scanResult.activeOfferBrand ? scanResult.activeOfferBrand : ""
              }`}</h1>
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "15px 0",
                }}
              >
                <Close style={{ fontSize: 100, color: "white" }} />
              </div>
              <Link href="/" rel="canonical" className="redBtn">
                عودة
              </Link>
            </Box>
          )}
        </Box>
      ) : (
        <>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                height: "100vh",
              }}
            >
              <Loading Circular={true}></Loading>
            </Box>
          )}
          {errorStatus && (
            <>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
              >
                <Box
                  m={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <h1 style={{ color: "black", direction: "rtl" }}>
                    {errorData.responseMessage || "غير موجود"}
                  </h1>

                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "15px 0",
                    }}
                  >
                    <Close style={{ fontSize: 100, color: "white" }} />
                  </div>
                  <Link href="/" rel="canonical" className="redBtn">
                    عودة
                  </Link>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ValidPage;
