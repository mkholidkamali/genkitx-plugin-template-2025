import { Client, TrafficModel } from "@googlemaps/google-maps-services-js";
import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";

const client = new Client({});

if (!process.env.GOOGLE_MAPS_API_KEY) {
  throw new Error(
    "GOOGLE_MAPS_API_KEY environment variable not found. Please set it to your Google Maps API key."
  );
}

export const streetTrafficFlow = defineFlow(
  {
    name: "streetTrafficFlow",
    inputSchema: z.object({
      origin: z.string(),
      destination: z.string(),
    }),
    outputSchema: z.any(),
  },
  async (input) => {
    const { origin, destination } = input;

    try {
      const args = {
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY!,
          departure_time: new Date(Date.now()),
          traffic_model: TrafficModel.best_guess,
          origin,
          destination,
        },
        timeout: 1000, // milliseconds
      };

      const response = await client.directions(args);

      if (response.data.status === "OK") {
        return response.data.routes;
      } else {
        throw new Error(response.data.error_message);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
