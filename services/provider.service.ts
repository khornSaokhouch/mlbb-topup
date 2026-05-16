import axios from 'axios';

// This is a mock service representing an integration with a real diamond reseller API.
// Examples of such APIs: SMILE.ONE, LAPAKGAMING, etc.

const PROVIDER_API_URL = process.env.PROVIDER_API_URL;
const PROVIDER_API_KEY = process.env.PROVIDER_API_KEY;

export const ProviderService = {
  /**
   * Validates the Game ID and Zone ID
   * returns the user's nickname if valid.
   */
  async validatePlayer(gameId: string, zoneId: string) {
    console.log(`Validating Player: ${gameId} (${zoneId})`);
    
    // Only use real API for MLBB (assuming MLBB uses zoneId)
    // If zoneId is provided, we assume it's MLBB validation
    if (zoneId && zoneId.length > 0) {
      try {
        // Call our internal API route which acts as a proxy
        const response = await axios.get(`/api/validate?id=${gameId}&server=${zoneId}`);
        
        if (response.data.success) {
          return {
            success: true,
            nickname: response.data.nickname,
          };
        } else {
          throw new Error(response.data.error || "Player not found");
        }
      } catch (err: any) {
        console.error("Validation error:", err);
        throw new Error(err.response?.data?.error || "Invalid Player ID or Server ID");
      }
    }

    // Default mock logic for other games
    await new Promise(resolve => setTimeout(resolve, 800));
    if (gameId === 'error') {
      throw new Error('Invalid Player ID');
    }

    return {
      success: true,
      nickname: `Gamer_${gameId.slice(-4)}`,
    };
  },

  /**
   * Places an order with the provider
   */
  async createOrder(params: {
    productId: string;
    gameId: string;
    zoneId: string;
    externalId: string; // Our internal Order ID
  }) {
    console.log(`Creating Provider Order for: ${params.productId}`);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      success: true,
      providerOrderId: `P-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'processing',
    };
  },

  /**
   * Checks order status from the provider
   */
  async checkStatus(providerOrderId: string) {
    console.log(`Checking Status for Provider Order: ${providerOrderId}`);

    return {
      status: 'success', // or 'processing', 'failed'
    };
  }
};
