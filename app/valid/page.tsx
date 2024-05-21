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
  const error = useSelector((state: any) => state.scan.error);

  useEffect(() => {
    const userId = searchParams.get("userId");
    if (userId) {
      dispatch(scan(userId));
    }
  }, [dispatch, searchParams]);

  return (
    <>
      {!isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {scanResult.responseCode == "200" && !error ? (
            <Box
              m={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <h1 style={{ color: "black" }}>{scanResult.responseMessage}</h1>
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
                <CheckCircleOutline style={{ fontSize: 100, color: "white" }} />
              </div>
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
              <h1 style={{ color: "black" }}>هذا الكارت غير صالح</h1>
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
    </>
  );
};

export default ValidPage;
