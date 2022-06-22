import {Client, LocalSigner} from "..";
import {SANDBOX} from "../src/Env";

jest.setTimeout(10000);
const signer = new LocalSigner("apiSecret");
const client = new Client(signer, SANDBOX, false);

test('test get account info', async () => {
    const res = await client.getAccountInfo();
    expect(res.success).toBeTruthy();
});

test('test get coin info', async () => {
    const res = await client.getCoinInfo("ETH");
    expect(res.success).toBeTruthy()
});

test('test new address ', async () => {
    const res = await client.newDepositAddress("BTC", true);
    expect(res.success).toBeTruthy()
});

test('test batch new address ', async () => {
    const res = await client.batchNewDepositAddress("BTC", 4, true);
    expect(res.success).toBeTruthy()
});

test('test verify deposit address', async () => {
    const res = await client.verifyDepositAddress("ETH", "0x05325e6f9d1f0437bd78a72c2ae084fbb8c039ee");
    expect(res.success).toBeTruthy()
});

test('test batch verify deposit address', async () => {
    const res = await client.batchVerifyDepositAddress("ETH", "0x05325e6f9d1f0437bd78a72c2ae084fbb8c039ee,0x05325e6f9d1f0437bd78a72c2ae084fbb8c039e1");
    expect(res.success).toBeTruthy()
});

test('test valid address', async () => {
    let res = await client.verifyValidAddress("ETH", "0x05325e6f9d1f0437bd78a72c2ae084fbb8c039ee");
    expect(res.success).toBeTruthy();
    expect(res.result).toBeTruthy();
    res = await client.verifyValidAddress("ETH", "0x05325e6f9d1f0437bd78a72c2ae084fbb8c03");
    expect(res.success).toBeTruthy();
    expect(res.result).toBe(false);
});


test('test get address history', async () => {
    const res = await client.getAddressHistory("ETH");
    expect(res.success).toBeTruthy()
});

test('test check loop address details', async () => {
    const res = await client.checkLoopAddressDetails("ETH", "0xe7ebdc5bbb6c99cc8f7f2c1c83ff38aa6647f38a");
    expect(res.success).toBeTruthy()
});

test('test check loop address list', async () => {
    const res = await client.verifyLoopAddressList("ETH", "0xe7ebdc5bbb6c99cc8f7f2c1c83ff38aa6647f38a,0x05325e6f9d1f0437bd78a72c2ae084fbb8c039ee");
    expect(res.success).toBeTruthy()
});

test('test get transaction details', async () => {
    const res = await client.getTransactionDetail("20210422193807000343569000002370");
    expect(res.success).toBeTruthy()
});

test('test get transactions by id', async () => {
    const res = await client.getTransactionsById({});
    expect(res.success).toBeTruthy()
});

test('test get transactions by txId', async () => {
    const res = await client.getTransactionsByTxId("0x5d5396c3992ed524bf68a22a7ab6ae503f0349354ad69bc5204d5214085d4e9f");
    expect(res.success).toBeTruthy()
});

test('test get transactions by time', async () => {
    const res = await client.getTransactionsByTime({});
    expect(res.success).toBeTruthy()
});

test('test get pending transactions', async () => {
    const res = await client.getPendingTransactions({});
    expect(res.success).toBeTruthy()
});

test('test get pending deposit details', async () => {
    const res = await client.getPendingDepositDetails("20200604171238000354106000006405");
    expect(res.success).toBeTruthy()
});

test('test withdraw', async () => {
    const res = await client.withdraw({
        coin: "TETH",
        request_id: "request_id_" + String(new Date().getTime()),
        address: "0xb744adc8d75e115eec8e582eb5e8d60eb0972037",
        amount: BigInt("1"),
        memo: 'cobo'
    });
    expect(res.success).toBeTruthy();
});

test('test query withdraw info', async () => {
    const res = await client.getWithdrawInfo("teth29374893624");
    console.log(res);
    expect(res.success).toBeTruthy();
});

test('test get staking product details', async () => {
    let res = await client.getStakingProductList("IOST");
    const productId = res.result[0]['product_id'];
    res = await client.getStakingProductDetails(productId);
    expect(res.success).toBeTruthy();
});

test('test get staking product list', async () => {
    const res = await client.getStakingProductList();
    console.log(res);
    expect(res.success).toBeTruthy();
});

test('test stake', async () => {
    let res = await client.getStakingProductList("IOST");
    const productId = res.result[0]['product_id'];
    res = await client.stake(productId, BigInt("1000000"));
    console.log(res)
});

test('test unstake', async () => {
    let res = await client.getStakingProductList("IOST");
    const productId = res.result[0]['product_id'];
    res = await client.unstake(productId, BigInt("1000000"));
    console.log(res.result)
});

test('test get stakings', async () => {
    const res = await client.getStakingData();
    expect(res.success).toBeTruthy();
});

test('test get unstakings', async () => {
    const res = await client.getUnstakingData();
    expect(res.success).toBeTruthy();
});

test('test get staking history', async () => {
    const res = await client.getStakingHistory({});
    expect(res.success).toBeTruthy();
});



