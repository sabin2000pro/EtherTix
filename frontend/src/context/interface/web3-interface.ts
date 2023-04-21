export interface IWeb3Context {
    accounts: any;
    currentBalance: any;
    currentOwner: any;
    connectMetaMaskWallet: () => void
    initialiseNftContract: () => void
    mintNewToken: () => void
    fetchAccountBalance: () => void
}