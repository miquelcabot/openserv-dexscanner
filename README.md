# DexScreener Scanner Agent

A specialized agent that scans **DexScreener** for the **highest 24-hour trading volume token** using the [OpenServ Labs SDK](https://github.com/openserv-labs/sdk).

This agent fetches a list of trending tokens from [DexScreener](https://dexscreener.com/) and determines the token with the highest trading volume in the last 24 hours. The selected token can then be used by other agents for further trading actions.

## Features

* Retrieves the **top boosted tokens** from **DexScreener API**.
* Fetches the **24-hour trading volume** for each token.
* Selects the **highest volume token**.
* Integrates seamlessly with OpenServ's AI agent platform.

## Before you start

### 1. Expose your local server

To allow OpenServ to access your agent locally, use a tunneling tool like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel):

Example using ngrok:

```bash
ngrok http 7378  # Replace 7378 with your actual PORT if different
```

Copy your tunneling tool URL (e.g., `https://your-name.ngrok-free.app`)

A tunneling is a software utility that exposes a local server on your machine to the internet through a secure public URL, making it useful for testing webhooks, APIs, or services in a local development environment.


### 2. Create an account on OpenServ

1. Create a developer account on [OpenServ](https://platform.openserv.ai)

### 2. Create an agent on OpenServ

1. Create an agent: Developer -> Add Agent --> Add: Agent Name and Capabilities Description

Agent Name: `DexScreener Scanner`
Capabilities Description: `Scans DexScreener for the highest volume token.`

2. Add Endpoint URL: set the agent's endpoint URL to your tunnelling URL (e.g. ngrok) --> Save
3. Create an API key: Manage this agent --> Create secret key --> Copy secret key

### 3. Create an OpenAI API key

1. Create an account on [OpenAI](https://platform.openai.com/)
2. Create an API key: API keys --> Create new secret key --> Copy key

## Setup

1. Clone this repository
```bash
git clone https://github.com/miquelcabot/openserv-dexscanner.git
cd openserv-dexscanner
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env`:
   - `OPENSERV_API_KEY`: Your OpenServ API key
   - `PORT`: The port number for your agent's HTTP server (default: 7378)
   - `OPENAI_API_KEY`: Your OpenAI API key

## Using with OpenServ Platform

1. Start your agent locally using `npm run dev` or `npm start`
2. Your agent is now ready to use on the platform!

## Example Agent

This agent includes a simple example agent that can perform the query

```typescript
// Example usage
const response = await agent.process({
  messages: [
    {
      role: 'user',
      content: 'find the highest volume token on DexScreener'
    }
  ]
})
```

## Development

Run the development server with hot reload:

```bash
npm run dev
```

## How to test the agent on OpenServ Platform

1. Go to the OpenServ Platform
2. Create a new Project: Projects -> Create a new project
3. Add Project Name and Project Goal and Instructions
4. Add Agent: Search for your agent name and add it to the project
5. Run the project
6. Verify if the agent response is equivalent to what you expect

## Code Quality

The project uses ESLint and Prettier for code quality and formatting:

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## Building

Build the project:

```bash
npm run build
```

Run the built version:

```bash
npm start
```

## Notes

- The project is set up with TypeScript, ts-node-dev for development, and includes VS Code debugging configuration
- Environment variables are validated using Zod
- ESLint and Prettier are configured for consistent code style
- The agent uses natural language processing to understand and execute commands
