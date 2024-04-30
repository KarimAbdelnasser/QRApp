"use client";
import Head from "next/head";
import { Box, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// interface Props {
//   value: string;
// }

const ValidPage: React.FC = () => {
  const searchParams = useSearchParams();
  const isTrue = searchParams.get("isValid");
  console.log(isTrue);

  return (
    <div>
      <Head>
        <title>valid</title>
      </Head>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {isTrue === "true" ? (
          <Box m={2} display="flex" flexDirection="column" alignItems="center">
            <h1 style={{ color: "black" }}>This card is valid</h1>
            <div
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                backgroundColor: "green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin:"15px 0 "
              }}
            >
              <CheckCircleOutline style={{ fontSize: 100, color: "white" }} />
            </div>
            <Link
              href="/pin"
              rel="canonical"
              style={{
                textDecoration: "none",
                fontSize: "28px",
                backgroundColor: "green",
                color: "white",
                padding:"8px 25px",
                borderRadius:"10px"
              }}
            >
              Next
            </Link>
          </Box>
        ) : (
          <Box m={2} display="flex" flexDirection="column" alignItems="center">
            <h1 style={{ color: "black" }}>This card is not valid</h1>
            <div
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "444px",
              }}
            >
              <Typography
                variant="h6"
                style={{ color: "white", fontSize: 100 }}
              >
                X
              </Typography>
            </div>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ValidPage;
