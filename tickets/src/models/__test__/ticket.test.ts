import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  // Save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance!.save();

  // save the second fetched ticket (expect can not save!)
  try {
    await secondInstance!.save();
  } catch (error) {
    return;
  }
  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  // Mongoose's optimistic concurrency control typically only increments the version when there are actual changes to the document.
  await ticket.save();
  expect(ticket.version).toEqual(0);

  // Modify the document before saving again
  ticket.price = 25;
  await ticket.save();
  expect(ticket.version).toEqual(1);

  // Modify again
  ticket.title = "updated concert";
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
