import {MPCClient, LocalSigner}  from "..";
import {DEV} from "./config";
import {PROD} from "./config";

var mpcApiSecret:string = '';
var clientEnv:any = DEV;

if(process.argv.length > 3){
    const paramEnv = process.argv.filter((x) => x.startsWith('-env='))[0].split('=')[1];
    const env = paramEnv ? paramEnv : 'develop';
    clientEnv = env==='prod' ? PROD: DEV;
    const paramApiSecret = process.argv.filter((x) => x.startsWith('-MPCSecretKey='))[0].split('=')[1]
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

//web3相关接口，暂时skip
// test('test get mpc support nft collections', async () => {
//     const res = await mpc_client.GetSupportedNftCollections('GETH');
//     console.log(res);
//     console.log(res.result);
//     expect(res.success).toBeTruthy();
// });

test('test get mpc walelt support coins', async () => {
    const res = await mpc_client.GetWalletSupportedCoins();
    expect(res.success).toBeTruthy();
});

test('test is valid address', async () => {
    const res = await mpc_client.IsValidAddress('GETH', '0x3ede1e59a3f3a66de4260df7ba3029b515337e5c');
    expect(res.success).toBeTruthy();
});

test('test get main address', async () => {
    const res = await mpc_client.GetMainAddress('GETH');
    expect(res.success).toBeTruthy();
});

test('test generate address', async () => {
    const res = await mpc_client.GenerateAddresses('GETH', 2);
    expect(res.success).toBeTruthy();
});

test('test update address description', async () => {
    const res = await mpc_client.UpdateAddressDescription('GETH', '0x6a060efe0ff887f4e24dc2d2098020abf28bcce4', 'test');
    expect(res.success).toBeTruthy();
});

test('test list address', async () => {
    const res = await mpc_client.ListAddresses('GETH');
    expect(res.success).toBeTruthy();
});

test('test get balance', async () => {
    const res = await mpc_client.GetBalance('0x6a060efe0ff887f4e24dc2d2098020abf28bcce4');

    expect(res.success).toBeTruthy();
});

test('test list balances', async () => {
    const res = await mpc_client.ListBalances(0, 10);
    expect(res.success).toBeTruthy();
});

test('test list spendable', async () => {
    const res = await mpc_client.ListSpendable('GETH');
    expect(res.success).toBeTruthy();
});

test('test create transaction', async () => {
    const request_id = String(new Date().getTime())
    const res = await mpc_client.CreateTransaction('GETH', request_id, '11', '0x6a060efe0ff887f4e24dc2d2098020abf28bcce4', '0x6a060efe0ff887f4e24dc2d2098020abf28bcce4');
    expect(res.success).toBeTruthy();
});

//web3相关接口，暂时skip
// test('test sign message', async () => {
//     const request_id = String(new Date().getTime())
//     const res = await mpc_client.SignMessage('GETH', request_id, '', 2, '{"message": "YWFhYQ=="}');
//     console.log(res);
//     console.log(res.result);
//     expect(res.success).toBeTruthy();
// });

test('test get transactions by requestIds', async () => {
    const res = await mpc_client.TransactionsByRequestIds('1668678820274');
    expect(res.success).toBeTruthy();
});

test('test get transactions by coboIds', async () => {
    const res = await mpc_client.TransactionsByCoboIds('20231213152104000114035000006167');
    expect(res.success).toBeTruthy();
});

test('test list transactions', async () => {
    const res = await mpc_client.ListTransactions();
    expect(res.success).toBeTruthy();
});

// test('test list tss node requests', async () => {
//     const res = await mpc_client.ListTssNodeRequests();
//     console.log(res);
//     console.log(res.result);
//     expect(res.success).toBeTruthy();
// });

test('test get sign messages by requestIds', async () => {
    const res = await mpc_client.SignMessagesByRequestIds('1690349242683,1690268795963,1690187858862');
    console.log(res);
    console.log(res.result);
    expect(res.success).toBeTruthy();
});

test('test get sign messages by coboIds', async () => {
    const res = await mpc_client.SignMessagesByCoboIds('20230726132723000341052000008222,20230725150636000308867000003494,20230725135301000361318000002480');
    // console.log(res);
    // console.log(res.result);
    expect(res.success).toBeTruthy();
});


test('test list tss node', async () => {
    const res = await mpc_client.ListTssNode();
    // console.log(res);
    // console.log(res.result);
    expect(res.success).toBeTruthy();
});

test('test get max send amount', async () => {
    const res = await mpc_client.GetMaxSendAmount("GETH", "0", "","0x6a060efe0ff887f4e24dc2d2098020abf28bcce4")
    // console.log(res);
    // console.log(res.result);
    expect(res.success).toBeTruthy();
});

test('test lock spendable', async () => {
    const res = await mpc_client.LockSpendable("BTC", "6374cf4c6664d6a6fc533a90a2e4cfa188cde0b9a44622212dd4faeab21fc6dc", 0)
    // console.log(res);
    // console.log(res.result);
    expect(res.success).toBeTruthy();
});

test('test unlock spendable', async () => {
    const res = await mpc_client.UnlockSpendable("BTC", "6374cf4c6664d6a6fc533a90a2e4cfa188cde0b9a44622212dd4faeab21fc6dc", 0)
    // console.log(res);
    // console.log(res.result);
    expect(res.success).toBeTruthy();
});

test('test get rate satoshis', async () => {
    const res = await mpc_client.GetRareSatoshis("BTC", "6374cf4c6664d6a6fc533a90a2e4cfa188cde0b9a44622212dd4faeab21fc6dc", 0)
    // console.log(res);
    // console.log(res.result);
    expect(res.success).toBeTruthy();
});