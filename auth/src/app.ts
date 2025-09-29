import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@nvktickets/common";

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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
