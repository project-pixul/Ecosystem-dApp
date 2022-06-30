import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const INFURA_KEY = '78333b6dce714ced905230d0e81b9f1c'

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 137, 56, 80001],
});

export const walletconnect = new WalletConnectConnector({
    bridge: "https://bridge.walletconnect.org",
    qrcode: true
});
  
export const walletlink = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    appName: "web3-react-demo"
});

export const activateInjectedProvider = (providerName: 'MetaMask' | 'CoinBase') => {
    const { ethereum } = window as any;

    if (!ethereum?.providers) {
        return undefined;
    }

    let provider;
    switch (providerName) {
        case 'CoinBase':
            provider = ethereum.providers.find(({ isCoinbaseWallet }) => isCoinbaseWallet);
            break;
        case 'MetaMask':
            provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
            break;
    }

    if (provider) {
        ethereum.setSelectedProvider(provider);
    }
}


