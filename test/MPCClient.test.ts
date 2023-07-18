import {LocalSigner} from "../src/LocalSigner";
import {MPCClient} from "../src/MPCClient";
import {SANDBOX} from "./config";
import {PROD} from "./config";

var mpcApiSecret:string = 'apiSecret';
var clientEnv:any = SANDBOX;

if(process.argv.length > 3){
    const paramEnv = process.argv.filter((x) => x.startsWith('-env='))[0].split('=')[1];
    const env = paramEnv ? paramEnv : 'sandbox';
    clientEnv = env==='prod' ? PROD: SANDBOX;
    const paramApiSecret = process.argv.filter((x) => x.startsWith('-mpcSecretKey='))[0].split('=')[1]
    mpcApiSecret = paramApiSecret ? paramApiSecret: 'mpcApiSecret'
}

jest.setTimeout(10000);
const signer = new LocalSigner(mpcApiSecret);
const mpc_client = new MPCClient(signer, clientEnv, false);

test('test get mpc support chains', async () => {
    const res = await mpc_client.GetSupportedChains();
    expect(res.success).toBeTruthy();
});


test('test get mpc support coins', async () => {
    const res = await mpc_client.GetSupportedCoins('GETH');
    expect(res.success).toBeTruthy();
});

test('test get mpc support nft collections', async () => {
    const res = await mpc_client.GetSupportedNftCollections('GETH');
    expect(res.success).toBeTruthy();
});

test('test get mpc walelt support coins', async () => {
    const res = await mpc_client.GetWalletSupportedCoins();
    expect(res.success).toBeTruthy();
});

test('test is valid address', async () => {
    const res = await mpc_client.IsValidAddress('GETH', '0x3ede1e59a3f3a66de4260df7ba3029b515337e5c');
    expect(res.success).toBeTruthy();
});

test('test get main address', async () => {
    const res = await mpc_client.GetMainAddress('');
    expect(res.success).toBeTruthy();
});

test('test generate address', async () => {
    const res = await mpc_client.GenerateAddresses('GETH', 2);
    expect(res.success).toBeTruthy();
});

test('test list address', async () => {
    const res = await mpc_client.ListAddresses('GETH');
    expect(res.success).toBeTruthy();
});

test('test get balance', async () => {
    const res = await mpc_client.GetBalance('0xc3378d6ae0b5d20cddb46138e051de48b143c161');

    expect(res.success).toBeTruthy();
});

test('test list balances', async () => {
    const res = await mpc_client.ListBalances(0, 10);
    expect(res.success).toBeTruthy();
});

test('test list spendable', async () => {
    const res = await mpc_client.ListSpendable('BTC');
    expect(res.success).toBeTruthy();
});

test('test create transaction', async () => {
    const request_id = String(new Date().getTime())
    const res = await mpc_client.CreateTransaction('GETH', request_id, '11', '0xc3378d6ae0b5d20cddb46138e051de48b143c161', '0x0ea5aca0faa3308cb29a78aae1b0dfc742eeb8ff');
    expect(res.success).toBeTruthy();
});

test('test sign message', async () => {
    const request_id = String(new Date().getTime())
    const res = await mpc_client.SignMessage('GETH', request_id, '', 1, '{"message": "YWFhYQ=="}');
    expect(res.success).toBeTruthy();
});

test('test get transactions by requestIds', async () => {
    const res = await mpc_client.TransactionsByRequestIds('1681613576739');
    expect(res.success).toBeTruthy();
});

test('test get transactions by coboIds', async () => {
    const res = await mpc_client.TransactionsByCoboIds('20230416105300000362112000006719');
    expect(res.success).toBeTruthy();
});

test('test list transactions', async () => {
    const res = await mpc_client.ListTransactions();
    expect(res.success).toBeTruthy();
});

test('test list tss node requests', async () => {
    const res = await mpc_client.ListTssNodeRequests();
    console.log(res);
    console.log(res.result);
    expect(res.success).toBeTruthy();
});

test('test list tss node', async () => {
    const res = await mpc_client.ListTssNode();
    console.log(res);
    console.log(res.result);
    expect(res.success).toBeTruthy();
});