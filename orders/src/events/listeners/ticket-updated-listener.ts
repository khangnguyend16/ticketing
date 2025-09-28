import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@nvktickets/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    try {
      const { title, price, orderId } = data;
      ticket.set({ title, price, orderId });
      await ticket.save();
    } catch (error) {
      console.error(error);
    }

    msg.ack();
  }
}
