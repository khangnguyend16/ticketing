import { Listener, OrderCancelledEvent, Subjects } from "@nvktickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: undefined });
    await ticket.save();

    const { id, orderId, userId, price, title, version } = ticket;
    await new TicketUpdatedPublisher(this.client).publish({
      id,
      orderId,
      userId,
      price,
      title,
      version,
    });

    msg.ack();
  }
}
