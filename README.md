# ASI1 x NextJS x Vercel AI SDK

This repository provides a demonstration of integrating **ASI1** with **Next.js** and the **Vercel AI SDK**.
Its primary objective is to serve as a reference implementation for creating a custom ASI1 provider within the Vercel AI SDK and combining ASI1 models with the latest versions of Next.js.

## Prerequisites

* Node.js (LTS version recommended)
* [pnpm](https://pnpm.io/) package manager
* A valid **ASI1 API key**

## Installation & Usage

1. Create a `.env.local` file in the root directory and add the following environment variable:

   ```bash
   ASI1_API_KEY=<YOUR-ASI1-API-KEY>
   ```

2. Install the project dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.