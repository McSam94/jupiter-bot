import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER ?? WalletAdapterNetwork.Devnet;
export const RPC_ENDPOINT = NETWORK === 'devnet' ? 'https://api.devnet.solana.com' : 'https://ssc-dao.genesysgo.net';
