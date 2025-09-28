import { Publisher, Subjects, TicketCreatedEvent } from "@nvktickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
