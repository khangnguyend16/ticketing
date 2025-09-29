import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@nvktickets/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true); // Cho Express biết rằng ứng dụng đang chạy phía sau một proxy (ví dụ: Nginx...)
app.use(express.json());
app.use(
  cookieSession({
    //middleware lưu dữ liệu session trực tiếp trong cookie (khác với express-session là lưu server-side).
    signed: false, // cookie chỉ chứa token JWT, mà token này đã tự có chữ ký rồi.
    // secure: process.env.NODE_ENV !== "test", // Cookie chỉ được gửi qua HTTPS (ngoại lệ cho trường hợp test!)
    secure: false,
  })
);
app.use(currentUser);

app.use(createChargeRouter);

app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
