import walletSwagger from "../docs/wallets.json";
import transactionSwagger from "../docs/transactions.json";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Wallet System API",
    version: "1.0.0",
    description: "API documentation for the Wallet System Backend Service",
  },
  servers: [
    {
      url: "https://wallet-system-6142.onrender.com",
    },
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    ...walletSwagger.paths,
    ...transactionSwagger.paths,
  },
};

export default swaggerSpec;
