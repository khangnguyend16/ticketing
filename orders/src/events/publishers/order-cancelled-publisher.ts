import { Publisher, OrderCancelledEvent, Subjects } from "@nvktickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
