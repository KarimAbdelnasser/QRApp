import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Image from "next/image";

function TableComponent({ subCategory }: any) {
  console.log(subCategory);

  return (
    <>
      {subCategory.branch ? (
        <Container maxWidth={"xl"} style={{ margin: "20px 0" }}>
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
                {subCategory.branch.map((row: any, i: any) => (
                  <TableRow
                    key={row.txt}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right" style={{ fontSize: "16px" }}>
                      {row.txt}
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "16px" }}>
                      {row.subscribe}
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "16px" }}>
                      {row.renewal}
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "16px" }}>
                      {row.year}
                    </TableCell>
                    <TableCell align="right" style={{ fontSize: "16px" }}>
                      {row.threeMonth}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      ) : (
        <div style={{ width: "100%" }}>
          <div className="main-page">
            <div className="card-container">
              <div className="card">
                <div className="qr-code">
                  <Image
                    className="qr-img"
                    src={subCategory.img}
                    alt={subCategory.title}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="card-content">
                  <h3>{subCategory.title}</h3>
                  <p>percentage: {subCategory.percentage}</p>
                  <p>{subCategory.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TableComponent;
