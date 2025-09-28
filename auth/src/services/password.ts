//scrypt: thuật toán băm mật khẩu an toàn (kháng brute-force tốt hơn SHA-256, MD5)
//randomBytes: tạo một chuỗi ngẫu nhiên, dùng để làm salt (giúp tăng bảo mật hash)
import { scrypt, randomBytes } from "crypto";

//promisify: biến hàm dạng callback (như scrypt) thành Promise, để có thể dùng await
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    // salt: chuỗi ngẫu nhiên 8 bytes (16 ký tự hex)
    const salt = randomBytes(8).toString("hex");

    // Kết quả trả về là một Buffer (dạng dữ liệu nhị phân)
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
