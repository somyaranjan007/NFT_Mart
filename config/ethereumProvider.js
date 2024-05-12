import { EthereumProvider } from "@walletconnect/ethereum-provider";


export const provider = EthereumProvider.init({
    projectId: '0f7bd4259d7ae896904800174911d61d',
    metadata: {
        name: 'My Website',
        description: 'My Website Description',
        url: 'http://localhost:3000',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
    },
    showQrModal: true,
    optionalChains: [2442],
    rpcMap: {
        
        2442: 'https://rpc.cardona.zkevm-rpc.com',
    }
})

export const signer = provider.signer;

