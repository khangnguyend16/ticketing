export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}), // await stripe.charges.create -> promise
  },
};
