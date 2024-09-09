import fetch from 'node-fetch';
import {Signer} from "./Signer";
import {LocalSigner} from "./LocalSigner";
import {URLSearchParams} from "url"
import {Env} from "./Env";
import sha256 = require("sha256");
import { ApiResponse } from '..';

export class Client {
    private readonly apiKey: string;
    private readonly coboPub: string;
    private readonly host: string;
    private readonly signer: Signer;
    private readonly debug: boolean;

    /***
     *
     * @param signer api signer
     * @param env DEV or PROD
     * @param debug
     */
    constructor(signer: Signer, env: Env, debug: boolean = false) {
        this.apiKey = signer.getPublicKey();
        this.coboPub = env.coboPub;
        this.host = env.host;
        this.signer = signer;
        this.debug = debug;
    }

    /***
     * get account info
     */
    getAccountInfo = () => {
        return this.coboFetch("GET", "/v1/custody/org_info/", {});
    };

    /***
     * get coin info
     * @param coin :coin code
     */
    getCoinInfo = (coin: string, amount?: null) => {
        let params: any = {"coin": coin};
        if (amount != null) {
            params["amount"] = amount;
        }
        return this.coboFetch("GET", "/v1/custody/coin_info/", params);
    };

    /***
     * get supported coins
     * @param coin :coin code
     */
    getSupportedCoins = () => {
        return this.coboFetch("GET", "/v1/custody/get_supported_coins/", {});
    };

    /***
     * new deposit address
     * @param coin: coin code
     * @param nativeSegwit: new segwit address
     */
    newDepositAddress = (coin: string, nativeSegwit = false) => {
        let params: any = {"coin": coin};
        if (nativeSegwit) {
            params["native_segwit"] = true;
        }
        return this.coboFetch("POST", "/v1/custody/new_address/", params);
    };

    /***
     * batch new deposit address
     * @param coin: coin code
     * @param count: address count
     * @param nativeSegwit: new segwit address
     */
    batchNewDepositAddress = (coin: string, count: number, nativeSegwit = false) => {
        let params: any = {
            "coin": coin,
            "count": count
        };
        if (nativeSegwit) {
            params["native_segwit"] = true;
        }
        return this.coboFetch("POST", "/v1/custody/new_addresses/", params);
    };

    /***
     * verify deposit address
     * @param coin: coin code
     * @param address: address
     */
    verifyDepositAddress = (coin: string, address: string) => {
        let params: any = {
            "coin": coin,
            "address": address
        };
        return this.coboFetch("GET", "/v1/custody/address_info/", params);
    };

    /***
     * verify deposit address
     * @param coin: coin code
     * @param addresses: address
     */
    batchVerifyDepositAddress = (coin: string, addresses: string) => {
        let params: any = {
            "coin": coin,
            "address": addresses
        };
        return this.coboFetch("GET", "/v1/custody/addresses_info/", params);
    };

    /***
     * verify address valid
     * @param coin: coin code
     * @param address: address
     */
    verifyValidAddress = (coin: string, address: string) => {
        let params: any = {
            "coin": coin,
            "address": address
        };
        return this.coboFetch("GET", "/v1/custody/is_valid_address/", params);
    };


    /***
     * get address history
     * @param coin: coin code
     * @param pageIndex: which page. 0 is start page
     * @param pageLength: page size <= 50
     * @param sortFlag: 0:DESCENDING 1:ASCENDING
     */
     getAddressHistory = (coin: string, pageIndex?: null, pageLength?: null, sortFlag?:null) => {
        let params: any = {
            "coin": coin,
        };
        if (pageIndex != null) {
            params["page_index"] = pageIndex;
        }
        if (pageLength != null) {
            params["page_length"] = pageLength;
        }
        if (sortFlag != null) {
            params["sort_flag"] = sortFlag;
        }
        return this.coboFetch("GET", "/v1/custody/address_history/", params);
    };


    /***
     * check loop address derails
     * @param coin: coin code
     * @param address: address
     * @param memo: memo
     */
    checkLoopAddressDetails = (coin: string, address: string, memo = null) => {
        let params: any = {
            "coin": coin,
            "address": address
        };
        if (memo != null) {
            params["memo"] = memo;
        }
        return this.coboFetch("GET", "/v1/custody/internal_address_info/", params);
    };

    /***
     * verify loop address list
     * @param coin: coin code
     * @param address: addresses, separated by ','
     */
    verifyLoopAddressList = (coin: string, address: string) => {
        let params: any = {
            "coin": coin,
            "address": address
        };
        return this.coboFetch("GET", "/v1/custody/internal_address_info_batch/", params);
    };

    /***
     * get transaction details
     * @param id :transaction id
     */
    getTransactionDetail = (id: string) => {
        let params: any = {
            "id": id,
        };
        return this.coboFetch("GET", "/v1/custody/transaction/", params);
    };

    /***
     * get transactions by txid
     * @param txid : txid
     */
    getTransactionsByTxId = (txid: string) => {
        return this.coboFetch("GET", "/v1/custody/transaction_by_txid/", {"txid": txid});
    };

    /***
     * get transaction by id
     * @param params : TransactionQueryParams
     */
    getTransactionsById = (params: TransactionQueryParams) => {
        return this.coboFetch("GET", "/v1/custody/transactions_by_id/", params);
    };

    /***
     * get transaction by request ids
     * @param params : TransactionQueryParams
     */
    getTransactionsByRequestId = (requestIds: string) => {
        return this.coboFetch("GET", "/v1/custody/transactions_by_id/", {"request_ids": requestIds});
    };

    /***
     * get transaction by time
     * @param params : TransactionQueryParams
     */
    getTransactionsByTime = (params: TransactionQueryParams) => {
        return this.coboFetch("GET", "/v1/custody/transactions_by_time/", params);
    };

    /***
     * get transaction by time ex
     * @param params : TransactionQueryParamsEx
     */
    getTransactionsByTimeEx = (params: TransactionQueryParamsEx) => {
        return this.coboFetch("GET", "/v1/custody/transactions_by_time_ex/", params);
    };

    /***
     * get pending transactions
     * @param params : TransactionQueryParams
     */
    getPendingTransactions = (params: TransactionQueryParams) => {
        return this.coboFetch("GET", "/v1/custody/pending_transactions/", params);
    };

    /***
     * get pending transaction deposit details
     * @param id: transaction id
     */
    getPendingDepositDetails = (id: string) => {
        return this.coboFetch("GET", "/v1/custody/pending_transaction/", {"id": id});
    };

       /***
     * get transaction history
     * @param params : TransactionHistoryQueryParamsEx
     */
    getTransactionHistory = (params: TransactionHistoryQueryParamsEx) => {
        return this.coboFetch("GET", "/v1/custody/transaction_history/", params);
    };

    /***
     * withdraw
     * @param params:WithdrawParams
     */
    withdraw = (params: WithdrawParams) => {
        params.request_id = params.request_id || `sdk_request_id_${sha256(params.address).slice(0, 8)}_${Date.now()}`;
        return this.coboFetch("POST", "/v1/custody/new_withdraw_request/", params);
    };

    /***
     * query withdraw info
     * @param id: request_id
     */
    getWithdrawInfo = (id: string) => {
        return this.coboFetch("GET", "/v1/custody/withdraw_info_by_request_id/", {"request_id": id});
    };

    /***
     * get staking product details
     * @param productId: product id
     */
    getStakingProductDetails = (productId: string) => {
        return this.coboFetch("GET", "/v1/custody/staking_product/", {"product_id": productId});
    };

    /***
     * get staking product list
     * @param coin
     * @param language
     */
    getStakingProductList = (coin?: string, language?: string) => {
        let params: any = {};
        if (coin != null) {
            params["coin"] = coin;
        }
        if (language != null) {
            params["language"] = language;
        }

        return this.coboFetch("GET", "/v1/custody/staking_products/", params);
    };

    /***
     * stake
     * @param productId: product id
     * @param amount: amount
     */
    stake = (productId: string, amount: BigInt) => {
        let params: any = {
            "product_id": productId,
            "amount": amount
        };
        return this.coboFetch("POST", "/v1/custody/staking_stake/", params);
    };

    /***
     * unstake
     * @param productId: product id
     * @param amount: amount
     */
    unstake = (productId: string, amount: BigInt) => {
        let params: any = {
            "product_id": productId,
            "amount": amount
        };
        return this.coboFetch("POST", "/v1/custody/staking_unstake/", params);
    };

    /***
     * get staking data
     * @param coin: coin code
     * @param language:language
     */
    getStakingData = (coin?: string, language?: "en") => {
        let params: any = {};
        if (coin != null) {
            params["coin"] = coin;
        }
        if (language != null) {
            params["language"] = language;
        }
        return this.coboFetch("GET", "/v1/custody/stakings/", params);
    };

    /***
     * get unstaking data
     * @param coin: coin code
     */
    getUnstakingData = (coin?: string) => {
        let params: any = {};
        if (coin != null) {
            params["coin"] = coin;
        }
        return this.coboFetch("GET", "/v1/custody/unstakings/", params);
    };

    /***
     * get Staking History
     * @param params:StakingQueryParams
     */
    getStakingHistory = (params: StakingQueryParams) => {
        return this.coboFetch("GET", "/v1/custody/unstakings/", params);
    };

    /***
     * get gas station balance
     */
    getGasStationBalance = () => {
        let params: any = {};

        return this.coboFetch("GET", "/v1/custody/get_gas_station_balance/", params);
    };

    addCoin = (coin: string) => {
        let params: any = {"coin": coin};
        return this.coboFetch("POST", "/v1/custody/add_coin/", params);
    };

    coboFetch = async (method: string, path: string, params: any): Promise<ApiResponse> => {
        let nonce = String(new Date().getTime());
        let sort_params = Object.keys(params).sort().map((k) => {
            return k + '=' + encodeURIComponent(params[k]).replace(/%20/g, "+");
        }).join('&');
        let content = [method, path, nonce, sort_params].join('|');
        let headers = {
            'Biz-Api-Key': this.apiKey,
            'Biz-Api-Nonce': nonce,
            'Biz-Api-Signature': this.signer.sign(content)
        };
        let response;

        if (this.debug) {
            console.log("request >>>>>>>> \nmethod:", method, "\npath:", path, "\ncontent:", content, "\nheaders:", headers);
        }
        if (method == 'GET') {
            let url = this.host + path + '?' + sort_params;
            response = await fetch(url, {
                headers: headers,
                method: "GET"
            });
        } else if (method == 'POST') {
            let urlParams = new URLSearchParams();

            for (let k in params) {
                if (params.hasOwnProperty(k)) {
                    urlParams.append(k, params[k])
                }
            }

            response = await fetch(this.host + path, {
                method: method,
                headers: headers,
                body: urlParams
            });

        } else {
            throw "unexpected method " + method;
        }

        const ts = response.headers.get("BIZ_TIMESTAMP");
        const sig = response.headers.get("BIZ_RESP_SIGNATURE");
        if (!sig || !ts) {
            throw Error("signature or ts null")
        }
        let json = await response.text();

        if (this.debug) {
            console.log("response <<<<<<<< \njson:", json, "\nsig:", sig, "\nts:", ts);
        }

        if (LocalSigner.verifyEccSignature(`${json}|${ts}`, sig, this.coboPub)) {
            return JSON.parse(json);
        }

        throw Error("signature verify failed!!!")
    }

}

export interface TransactionQueryParams {
    coin?: string,
    side?: string,
    address?: string,
    limit?: number,
    include_financial?: string,
    begin_time?: string,
    end_time?: string,
    max_id?: string,
    min_id?: string,
}

export interface TransactionQueryParamsEx {
    coins?: string,
    side?: number,
    status?: number,
    address?: string,
    txid?: string,
    limit?: number,
    offset?: number,
    begin_time?: string,
    end_time?: string,
    order_by?: string,
    order?: string,
}

export interface WithdrawParams {
    coin: string,
    request_id?: string,
    address: string,
    amount: BigInt,
    memo?: string,
    force_internal?: string,
    for_external?: string,
    remark?: string
}

export interface StakingQueryParams {
    coin?: string,
    type?: string,
    max_id?: string,
    limit?: string,
    product_id?: string
}

export interface TransactionHistoryQueryParamsEx {
    coin?: string,
    side?: number,
    address?: string,
    max_id?: string,
    min_id?: string,
    limit?: number,
    begin_time?: string,
    end_time?: string,
    include_financial?: string,
}