export const natsWrapper = {
  client: {
    // Create a mock function
    publish: jest.fn().mockImplementation((subject: string, data: string, callback: () => void) => {
      callback();
    }),
  },
};
