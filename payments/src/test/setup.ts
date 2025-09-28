import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

jest.mock("../nats-wrapper.ts");

let mongo: any;
beforeAll(async () => {
  // khởi động một MongoDB giả trong bộ nhớ.
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri(); //lấy địa chỉ kết nối (kiểu như mongodb://127.0.0.1:randomPort/dbName)

  await mongoose.connect(mongoUri, {});
});

// Chạy trước mỗi test case
beforeEach(async () => {
  process.env.JWT_KEY = "asdfasdf";
  jest.clearAllMocks();
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      // xóa hết dữ liệu trong từng collection => Giúp mỗi test bắt đầu với DB sạch, không bị dữ liệu của test trước ảnh hưởng.
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  // giải phóng bộ nhớ, không bị leak process khi Jest chạy xong
  await mongoose.connection.close();
});

declare global {
  // hàm này trả về một resolve ra mảng string (ở đây chính là cookie từ response).
  var signin: (id?: string) => string[];
  // quy ước của TypeScript: khi bạn mở rộng global scope thì dùng var
}

// tạo ra một hàm tiện ích (helper function) để fake user signin trong môi trường test.
global.signin = (id?: string) => {
  // Build a JWT payload.  {id,email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object  {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64 (mã hóa gọn để lưu trong cookie)
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string that the cookie with encoded data
  return [`session=${base64}`];
};
