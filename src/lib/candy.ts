import { publicKey } from "@metaplex-foundation/umi";
import { Connection } from "@solana/web3.js";

export const candyMachineAddress = publicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE_ADDRESS! || ""
);
export const candyGuardAddress = publicKey(
  process.env.NEXT_PUBLIC_CANDY_GUARD_ADDRESS! || ""
);

export const collectionMintAddress = publicKey(
  process.env.NEXT_PUBLIC_COLLECTION_MINT_ADDRESS! || ""
);

export const testCollectionAddress = publicKey(
  process.env.NEXT_PUBLIC_TEST_COLLECTION_ADDRESS! || ""
);
export const OFFCHAIN_URL = process.env.NEXT_PUBLIC_OFFCHAIN_API;
export const HELIUS_RPC_URL = process.env.NEXT_PUBLIC_HELIUS_RPC_URL!;
export const HONEYCOMB_RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC_ENDPOINT!;
export const honeycombConnection = new Connection(HONEYCOMB_RPC_ENDPOINT);
export const heliusConnection = new Connection(HELIUS_RPC_URL);
export const usersAllowList: string[] = [
  "Ds8sYs4N6jjNitYebf3egxCw4YtgTz48gJBnu9Ly8goa",
  "BnxLpQWBjh1A4ZpLGnBphPoUit4ys6Ah1rKxorfyKF4B",
  "2AMmjo9KuHRzpeiyTGeLcrtrrh7VriqEzHRF34rouMEp",
  "3WAAfuHST8zCJu9zbYT4VwAi2azWDL37jANMqkqwaCNW",
  "rock8mRUkoeRg7LY93DzaCXpPjpDiadRjVu8gMVJT64",
  "Ea15qsV5JxmnroAmCiw9Mc7qndDdUTv4upVGuSEgAUpQ",
  "9uBfdooWZzvjS8r2see8LJs82iuRVBdGaM2JtVJEmQy3",
  "CxvGSCAydd8fnib9ivKMDbpEggWt6BGWsG6wdKoyeNzA",
  "HYUPahzEHK8nuVPDSKyH59nLxahf1XLum9rJrHbH5b4u",
  "7GwwP7vDqAse8sgxhPqtZxREh9Eq2D87kd9Z1wC3o4iw",
  "GX7LYVVMApaSLZswjJQLC7s21E69xEyLxcwgiCtNKRkY",
  "7LUbP4BZQiopPposQUW7JBrKJ2vgrv7drjbTeFRAb5TS",
  "9AMT9yYKayvxaapuz36UPvySFKWk1vyj8hVCEN4hZeRE",
  "2d2ZQ5AdxTDQdwsdrRD5o4PoD5cAj66WZx66JDAChamC",
];

export type Nft = {
  _id: string;
  mint: string;
  name: string;
  description: string;
  explorerId?: number;
  image: string;
  imageUrl?: string;
  json_uri: string;
  owner: string;
  stakingPoints: number;
  attributes: [
    {
      value: string;
      trait_type: string;
    }
  ];
};
