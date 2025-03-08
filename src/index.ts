import { z } from 'zod'
import { Agent } from '@openserv-labs/sdk'
import axios from 'axios'
import 'dotenv/config'

// Create the agent
const agent = new Agent({
  systemPrompt: 'You are an agent that scans DexScreener for the highest-volume token'
})

// Add find the highest volume token capability
agent.addCapability({
  name: 'find_top_traded_token',
  description: 'Finds the token with the highest 24h trading volume on DexScreener',
  schema: z.object({
  }),
  async run({ args }) {
    try {
      console.log('🔍 Getting the list of most popular tokens from DexScreener...');
      
      // Get the list of most active tokens
      const response = await axios.get('https://api.dexscreener.com/token-boosts/top/v1');
      const tokens = response.data;

      if (!tokens || tokens.length === 0) {
        throw new Error('❌ No tokens with active boosts found.');
      }

      let topToken = null;
      let highestVolume = 0;

      console.log(`📊 Processing ${tokens.length} tokens...`);

      // Iterate over tokens to get their trading volume
      for (const token of tokens) {
        const { chainId, tokenAddress } = token;

        const tokenResponse = await axios.get(`https://api.dexscreener.com/tokens/v1/${chainId}/${tokenAddress}`);
        const tokenData = tokenResponse.data[0];

        if (tokenData) {
          const volume = parseFloat(tokenData.volume?.h24 || "0");
          console.log(`📈 Token: ${tokenData.baseToken.symbol} - Volum: ${volume}`);

          if (volume > highestVolume) {
            highestVolume = volume;
            topToken = {
              token: tokenData.baseToken.symbol,
              address: tokenData.baseToken.address,
              volume: volume,
              dex: tokenData.dexId,
              price: tokenData.priceUsd
            };
          }
        }
      }

      if (topToken) {
        console.log(`✅ Selected token: ${topToken.token} (${topToken.address}) - Volume: ${topToken.volume}`);
        return topToken;
      } else {
        throw new Error('❌ No tokens with trading volume found.');
      }
    } catch (error) {
      console.error('⚠️ DexScreener scan error:', error);
      return { error: error.message };
    }
  }
})

// Start the agent's HTTP server
agent.start()

async function main() {
  const scanner = await agent.process({
    messages: [
      {
        role: 'user',
        content: 'find the highest volume token on DexScreener'
      }
    ]
  })

  console.log('Top Token:', scanner.choices[0].message.content)
}

main().catch(console.error)
