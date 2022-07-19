import {Client, LocalSigner} from "..";
import {SANDBOX} from "./config";
import {PROD} from "./config";
import {SANDBOX_TEST_DATA} from "./config";
import {PROD_TEST_DATA} from "./config";

var apiSecret:string = 'apiSecret';
var clientEnv:any = SANDBOX;
var testData:any = SANDBOX_TEST_DATA

if(process.argv.length > 3){
    const paramEnv = process.argv.filter((x) => x.startsWith('-env='))[0].split('=')[1];
    const env = paramEnv ? paramEnv : 'sandbox';
    clientEnv = env==='prod' ? PROD: SANDBOX;
    const paramApiSecret = process.argv.filter((x) => x.startsWith('-secretKey='))[0].split('=')[1]
    apiSecret = paramApiSecret ? paramApiSecret: 'apiSecret' 
    testData = env==='prod' ? PROD_TEST_DATA: SANDBOX_TEST_DATA;
}

jest.setTimeout(10000);
const signer = new LocalSigner(apiSecret);
const client = new Client(signer, clientEnv, false);

test('test get account info', async () => {
    const res = await client.getAccountInfo();
    expect(res.success).toBeTruthy();
});

it.each`
    coin                   
    ${'BTC'}               
    ${'ETH'}           
    ${'ETH_USDT'}        
    ${'XRP'}                
`('test get valid $coin info', async ({coin}) => {
    const res = await client.getCoinInfo(coin);
    expect(res.success).toBeTruthy();
});

it.each`
    coin                   
    ${'BTTB'}                              
`('test get invalid $coin info', async ({coin}) => {
    const res = await client.getCoinInfo(coin);
    expect(res.success).toBeFalsy();
    expect(res.error_code).toEqual(12002);
});

it.each`
    coin          | native_segwit            
    ${'BTC'}      | ${true}            
    ${'BTC'}      | ${false}           
    ${'ETH'}      | ${false}         
    ${'ETH_USDT'} | ${false}  
    ${'XRP'}      | ${false}
`('test new valid $coin address ', async ({coin, native_segwit}) => {
    const res = await client.newDepositAddress(coin, native_segwit);
    expect(res.success).toBeTruthy();
});

it.each`
    coin          | native_segwit            
    ${'BTTB'}     | ${true}            
    ${'ETTE'}     | ${false}           
`('test new invalid $coin address ', async ({coin, native_segwit}) => {
    const res = await client.newDepositAddress(coin, native_segwit);
    expect(res.success).toBeFalsy();
    expect(res.error_code).toEqual(12002);
});

it.each`
    coin          | native_segwit | count          
    ${'BTC'}      | ${true}       | ${2}   
    ${'BTC'}      | ${false}      | ${2}      
    ${'ETH'}      | ${false}      | ${2}    
    ${'ETH_USDT'} | ${false}      | ${2}  
    ${'XRP'}      | ${false}      | ${2}  
`('test batch new valid $coin addresses ', async ({coin, native_segwit, count}) => {
    const res = await client.batchNewDepositAddress(coin, count, native_segwit);
    expect(res.success).toBeTruthy();
});

it.each`
    coin          | native_segwit | count          
    ${'BTTB'}     | ${true}       | ${2}   
    ${'ETTE'}     | ${false}      | ${2}      
`('test batch new invalid $coin addresses', async ({coin, native_segwit, count}) => {
    const res = await client.batchNewDepositAddress(coin, count, native_segwit);
    expect(res.success).toBeFalsy();
    expect(res.error_code).toEqual(12002);
});

it.each`
    coin                   
    ${'BTC'}                      
    ${'XRP'}                
`('test verify valid $coin deposit address', async ({coin}) => {
    const res = await client.verifyDepositAddress(coin, testData.deposit_address[coin]);
    expect(res.success).toBeTruthy();
});

it.each`
    coin     | address             
    ${'BTC'} | ${'3Kd5rjiLtvpHv5nhYQNTTeRLgrz4om32PJ'}                 
    ${'XRP'} | ${'rndm7RphBZG6CpZvKcG9AjoFbSvcKhwLCx'}           
`('test verify invalid $coin deposit address', async ({coin, address}) => {
    const res = await client.verifyDepositAddress(coin, address);
    expect(res.success).toBeFalsy();
    expect(res.error_code).toEqual(12015);
});

it.each`
    coin     | count             
    ${'BTC'} |  ${2}                     
    ${'XRP'} |  ${2}           
`('test batch verify valid $coin deposit address', async ({coin, count}) => {
    const res = await client.batchVerifyDepositAddress(coin, testData.deposit_addresses[coin]);
    expect(res.success).toBeTruthy();
    expect(res.result['addresses'].split(',').length).toEqual(count);
});

it.each`
    coin     | addresses           
    ${'BTC'} | ${'3Kd5rjiLtvpHv5nhYQNTTeRLgrz4om32PJ,bc1q9unqc738dxjg5mk8zqtz33zg59cahrj29s24lp'}                   
    ${'XRP'} | ${'rndm7RphBZG6CpZvKcG9AjoFbSvcKhwLCx,rrBD4sBsxrpzbohAEYWH4moPSsoxupWLA|00000000'}               
`('test batch verify invalid $coin deposit address', async ({coin, addresses}) => {
    const res = await client.batchVerifyDepositAddress(coin, addresses);
    expect(res.success).toBeTruthy();
    expect(res.result['addresses'].length).toEqual(0);
});


it.each`
    coin          | address           
    ${'BTC'}      | ${'3Kd5rjiLtvpHv5nhYQNTTeRLgrz4om32PJ'}                   
    ${'BTC'}      | ${'bc1q9unqc738dxjg5mk8zqtz33zg59cahrj29s24lp'}     
    ${'ETH'}      | ${'0xE410157345be56688F43FF0D9e4B2B38Ea8F7828'}  
    ${'ETH_USDT'} | ${'0xEEACb7a5e53600c144C0b9839A834bb4b39E540c'}  
    ${'XRP'}      | ${'rndm7RphBZG6CpZvKcG9AjoFbSvcKhwLCx'}  
    ${'XRP'}      | ${'rGNXLMNHkUEtoo7qkCSHEm2sfMo8F969oZ|2200701580'}            
`('test valid $coin address', async ({coin, address}) => {
    let res = await client.verifyValidAddress(coin, address);
    expect(res.success).toBeTruthy();
    expect(res.result).toBeTruthy();
});

it.each`
    coin          | address           
    ${'BTC'}      | ${'0xE410157345be56688F43FF0D9e4B2B38Ea8F7828'}                   
    ${'ETH'}      | ${'rBWpYJhuJWBPAkzJ4kYQqHShSkkF3rgeDE'}         
`('test invalid $coin address', async ({coin, address}) => {
    let res = await client.verifyValidAddress(coin, address);
    expect(res.success).toBeTruthy();
    expect(res.result).toBeFalsy();
});


it.each`
    coin                   
    ${'BTC'}               
    ${'ETH'}           
    ${'ETH_USDT'}        
    ${'XLM'}                
`('test get valid $coin address history', async ({coin}) => {
    const res = await client.getAddressHistory(coin);
    expect(res.success).toBeTruthy();
    expect(res.result.length).toBeGreaterThan(0);
});

it.each`
    coin          | pageIndex   | pageLength
    ${'BTC'}      | ${1}        | ${0}      
    ${'BTC'}      | ${1}        | ${51}    
`('test get invalid $coin address history with invalid page', async ({coin, pageIndex, pageLength}) => {
    const res = await client.getAddressHistory(coin, pageIndex, pageLength);
    console.log("coin:"+coin+",pageIndex:"+pageIndex+",pageLength:"+pageLength)
    expect(res.success).toBeFalsy();
    expect(res.error_code).toEqual(1011);

});

it.each`
    coin          | pageIndex   | pageLength   |sorfFlag
    ${'BTC'}      | ${0}        | ${2}         |${1}      
    ${'BTC'}      | ${0}        | ${2}         |${0}    
`('test get valid $coin address history with page', async ({coin, pageIndex, pageLength}) => {
    const res = await client.getAddressHistory(coin, pageIndex, pageLength);
    expect(res.success).toBeTruthy();
    expect(res.result.length).toBeGreaterThan(0);
    console.log("coin:"+coin+",pageIndex:"+pageIndex+",pageLength:"+pageLength+",result.length:"+res.result.length)

});

it.each`
    coin          | pageIndex   | pageLength   |sorfFlag
    ${'BTC'}      | ${1}        | ${0}         |${1}
    ${'BTC'}      | ${1}        | ${51}        |${0}  
`('test get invalid $coin address history with invalid page', async ({coin, pageIndex, pageLength, sortFlag}) => {
    const res = await client.getAddressHistory(coin, pageIndex, pageLength, sortFlag);
    console.log("coin:"+coin+",pageIndex:"+pageIndex+",pageLength:"+pageLength+",sortFlag:"+sortFlag)
    expect(res.success).toBeFalsy();
    expect(res.error_code).toEqual(1011);

});

it.each`
    coin          | memo           
    ${'BTC'}      | ${false}                   
    ${'XRP'}      | ${true}         
`('test check $coin loop address details', async ({coin, memo}) => {
    var address,memoInfo = undefined
    if(memo){
        address = testData.loop_address[coin].split('|')[0];
        memoInfo = testData.loop_address[coin].split('|')[1];
    }
    else{
        address = testData.loop_address[coin];
        memoInfo = null;
    }
    const res = await client.checkLoopAddressDetails(coin, address, memoInfo);
    expect(res.success).toBeTruthy();
    expect(res.result['is_internal_address']).toBeTruthy();
});

it.each`
    coin          
    ${'BTC'}                    
    ${'XRP'}               
`('test check $coin loop address list', async ({coin}) => {
    const res = await client.verifyLoopAddressList(coin, testData.loop_addresses[coin]);
    expect(res.success).toBeTruthy();
});

test('test get transaction details', async () => {
    const res = await client.getTransactionDetail(testData.cobo_id);
    expect(res.success).toBeTruthy();
});

test('test get transactions by id', async () => {
    const res = await client.getTransactionsById({});
    expect(res.success).toBeTruthy();
});

test('test get transactions by txId', async () => {
    const res = await client.getTransactionsByTxId(testData.tx_id);
    expect(res.success).toBeTruthy()
});

test('test get transactions by time', async () => {
    const res = await client.getTransactionsByTime({});
    expect(res.success).toBeTruthy();
});

test('test get pending transactions', async () => {
    const res = await client.getPendingTransactions({});
    expect(res.success).toBeTruthy();
});

test('test get pending deposit details', async () => {
    const pendingTx = await client.getPendingTransactions({});
    if(pendingTx.result.length > 0){
        const pending_id = pendingTx.result[0]['id'];
        const res = await client.getPendingDepositDetails(pending_id);
        expect(res.success).toBeTruthy();
    }
    else{
        xtest ;
    }
});

it.each`
    coin          | address                                         |memo            |amount
    ${'COBO_ETH'} | ${'0xE410157345be56688F43FF0D9e4B2B38Ea8F7828'} |${null}         |${BigInt('1')}                
    ${'XLM'}      | ${'GBJDU6TPWHKGV7HRLNTIBA46MG3MB5DUG6BISHX3BF7I75H2HLPV6RJX'}    |${'4e73f03b'} |${BigInt('1')}   
`('test $coin withdraw', async ({coin, address, memo, amount}) => {
    const res = await client.withdraw({
        coin: coin,
        request_id: "request_id_" + String(new Date().getTime()),
        address: address,
        amount: amount,
        memo: 'cobo'
    });
    expect(res.success).toBeTruthy();
});

test('test query withdraw info', async () => {
    const res = await client.getWithdrawInfo(testData.withdraw_id);
    expect(res.success).toBeTruthy();
});

test('test get staking product list', async () => {
    const res = await client.getStakingProductList();
    expect(res.success).toBeTruthy();
});

test('test get staking product details', async () => {
    const stakings = await client.getStakingProductList();
    const productId = stakings.result[0]['product_id'];
    const res = await client.getStakingProductDetails(productId);
    expect(res.success).toBeTruthy();
});

test('test stake', async () => {
    const stakings = await client.getStakingProductList('TETH');
    if(stakings.result.length >0){
        const productId = stakings.result[0]['product_id'];
        const res = await client.stake(productId, BigInt('1000000'));
        expect(res.success).toBeTruthy();
    }
    else{
        xtest;
    }
});

test('test unstake', async () => {
    const stakings = await client.getStakingProductList('TETH');
    if(stakings.result.length >0){
        const productId = stakings.result[0]['product_id'];
        const res = await client.unstake(productId, BigInt('1000000'));
    }
    else{
        xtest;
    }
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



