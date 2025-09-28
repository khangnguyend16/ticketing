import { Subjects, Publisher, PaymentCreatedEvent } from "@nvktickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
