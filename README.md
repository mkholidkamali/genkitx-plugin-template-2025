# Genkit x Google Maps

A Genkit plugin that provides real-time traffic information using the Google Maps API.

## Installation

To install the plugin, you need to have Genkit and the Google Maps plugin installed.

```bash
npm install genkit @genkit-ai/google-maps
```

## Usage

To use the plugin, you need to have a Google Maps API key. You can get one from the Google Cloud Platform Console.

Once you have the API key, you can use the `streetTrafficFlow` flow to get the traffic information for a specific location.

```ts
import { streetTrafficFlow } from "@genkit-ai/google-maps";

const traffic = await streetTrafficFlow({
  address: "1600 Amphitheatre Parkway, Mountain View, CA",
});

console.log(traffic);
```
