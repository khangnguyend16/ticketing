import { Publisher, OrderCreatedEvent, Subjects } from "@nvktickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
