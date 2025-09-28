// enum (enumeration: liệt kê)
export enum Subjects {
  TicketCreated = "ticket:created",
  OrderUpdated = "order:updated",
}

// Lợi ích khi dùng enum:
// 1. Tránh lỗi gõ nhầm (typo) khi viết "ticket:created" nhiều lần
// 2. Tái sử dụng dễ dàng trong nhiều file
// 3. Type safety: TypeScript sẽ bắt bạn chỉ dùng đúng các giá trị trong enum, không thể truyền string bất kỳ

// const printSubject = (subject: Subjects) => {

// }

// printSubject(Subjects.TicketCreated)
