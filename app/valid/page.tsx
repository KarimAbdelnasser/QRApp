"use client";
import Head from "next/head";
import { Box, Typography } from "@mui/material";
import { CheckCircleOutline, Close } from "@mui/icons-material";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ValidPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>valid</title>
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <ValidComponent />
      </Suspense>
    </div>
  );
};

const ValidComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const isTrue = searchParams.get("isValid");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {isTrue === "true" ? (
        <Box m={2} display="flex" flexDirection="column" alignItems="center">
          <h1 style={{ color: "black" }}>هذا الكارت صالح</h1>
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
        <Box m={2} display="flex" flexDirection="column" alignItems="center">
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
  );
};

export default ValidPage;
