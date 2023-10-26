import {LocalSigner} from "../src/LocalSigner";
import {Web3Client} from "../src/Web3Client";
import {DEV} from "./config";
import {PROD} from "./config";

var web3ApiSecret:string = 'apiSecret';
var clientEnv:any = DEV;

if(process.argv.length > 3){
    const paramEnv = process.argv.filter((x) => x.startsWith('-env='))[0].split('=')[1];
    const env = paramEnv ? paramEnv : 'develop';
    clientEnv = env==='prod' ? PROD: DEV;
    const paramApiSecret = process.argv.filter((x) => x.startsWith('-web3SecretKey='))[0].split('=')[1]
    web3ApiSecret = paramApiSecret ? paramApiSecret: web3ApiSecret
}

jest.setTimeout(10000);
const signer = new LocalSigner(web3ApiSecret);
const web3_client = new Web3Client(signer, clientEnv, false);

test('test get web3 support chains', async () => {
    const res = await web3_client.getWeb3SupportedChains();
    expect(res.success).toBeTruthy();
});

test('test get web3 support coins', async () => {
    const res = await web3_client.getWeb3SupportedCoins('GETH');
    expect(res.success).toBeTruthy();
})

test('test get web3 support nft collections', async () => {
    const res = await web3_client.getWeb3SupportedNftCollections();
    expect(res.success).toBeTruthy();
}); 

test('test get web3 support coins', async () => {
    const res = await web3_client.getWeb3SupportedContracts('GETH');
    expect(res.success).toBeTruthy();
})

test('test get web3 support contract methods', async () => {
    const res = await web3_client.getWeb3SupportedContractMethods('GETH', '0x7851dcc90e79f3f2c59915e7f4d6fabd8d3d305b');
    expect(res.success).toBeTruthy();
});

test('test batch new web3 address', async () => {
    const res = await web3_client.batchWeb3NewAddress('GETH', 2);
    expect(res.success).toBeTruthy();
});

test('test get web3 address list', async () => {
    const res = await web3_client.getWeb3AddressList('GETH', 0, 20);
    expect(res.success).toBeTruthy();
});
    
test('test get web3 wallet asset list', async () => {
    const res = await web3_client.getWeb3WalletAssetList('0xd387292d5be73c8b9d6d3a4dcdd49e00edf75b6a', 'GETH');
    expect(res.success).toBeTruthy();
});
      
test('test get web3 wallet nft list', async () => {
    const res = await web3_client.getWeb3WalletNftList('NFT_RETH_PROOF_MOONBIRDS', '0xd387292d5be73c8b9d6d3a4dcdd49e00edf75b6a');
    expect(res.success).toBeTruthy();
});
    
test('test get web3 wallet nft detail', async () => {
    const res = await web3_client.getWeb3WalletNftDetail('NFT_ETH_CH', '44870459013827687655067438984317261948508900266699599897107078061993945464882');
    expect(res.success).toBeTruthy();
});

test('test web3 withdraw', async () => {
    const request_id = String(new Date().getTime())
    const res = await web3_client.web3Withdraw('ETH', request_id, '0xd2176409a1ac767824921e45b7ee300745cb1e3f', '0xD2176409a1Ac767824921e45B7Ee300745cB1e3f', 1);
    expect(res.success).toBeTruthy();
});

test('test get web3 withdraw transaction', async () => {
    const res = await web3_client.getWeb3WithdrawTransaction('1678438801416');
    console.log(res)
    expect(res.success).toBeTruthy();
});

test('test web3 contract', async () => {
    const request_id = String(new Date().getTime())
    const res = await web3_client.web3Contract('ARBITRUM_ETH', request_id, '0xd2176409a1ac767824921e45b7ee300745cb1e3f', '0x252449d4f514d59ffacd5526542d4b4a94932969', '0x42842e0e', 'safeTransferFrom', "[\"0xff944326a6a98a6c257b815009f36326ef825ccb\", \"0x4629a4b6b4FEBd13536871E167151be9d16535b3\", 172]", 0);
    console.log(request_id)
    console.log(res)
    expect(res.success).toBeTruthy();
});

test('test get web3 contract transaction', async () => {
    const res = await web3_client.getWeb3ContractTransaction("1664239624441");
    expect(res.success).toBeTruthy();
});

test('test list web3 transaction', async () => {
    const res = await web3_client.listWeb3WalletTransactions('0xd2176409a1ac767824921e45b7ee300745cb1e3f');
    expect(res.success).toBeTruthy();
});