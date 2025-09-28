import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  // hàm này trả về một Promise resolve ra mảng string (ở đây chính là cookie từ response).
  var signup: () => Promise<string[]>;
  // quy ước của TypeScript: khi bạn mở rộng global scope thì dùng var
}

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

// tạo ra một hàm tiện ích (helper function) để fake user signup trong môi trường test.
global.signup = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app).post("/api/users/signup").send({ email, password }).expect(201);

  const cookie = response.get("Set-Cookie");

  if (!cookie) {
    throw new Error("Failed to get cookie from response");
  }
  return cookie;
};
