import fetch from 'node-fetch';
import {Signer} from "./Signer";
import {LocalSigner} from "./LocalSigner";

export class Client {
    private readonly apiKey: string;
    private readonly coboPub: string;
    private readonly host: string;
    private signer: Signer;

    constructor(apiKey: string, signer: Signer, coboPub: string, host = "https://api.sandbox.cobo.com") {
        this.apiKey = apiKey;
        this.coboPub = coboPub;
        this.host = host;
        this.signer = signer;
    }

    getAccountInfo = () => {
        return this.coboFetch("GET", "/v1/custody/org_info/", {});
    };

    getCoinInfo = (coin: string) => {
        return this.coboFetch("GET", "/v1/custody/coin_info/", {"coin": coin});
    };

    newDepositAddress = (coin: string, nativeSegwit = false) => {
        let params: any = {"coin": coin};
        if (nativeSegwit) {
            params["native_segwit"] = true;
        }
        return this.coboFetch("POST", "/v1/custody/new_address/", params);
    };

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

    verifyDepositAddress = (coin: string, address: string) => {
        let params: any = {
            "coin": coin,
            "address": address
        };
        return this.coboFetch("GET", "/v1/custody/address_info/", params);
    };

    verifyValidAddress = (coin: string, address: string) => {
        let params: any = {
            "coin": coin,
            "address": address
        };
        return this.coboFetch("GET", "/v1/custody/is_valid_address/", params);
    };

    getAddressHistory = (coin: string, address: string) => {
        let params: any = {
            "coin": coin,
        };
        return this.coboFetch("GET", "/v1/custody/address_history/", params);
    };

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

    verifyLoopAddressList = (coin: string, address: string) => {
        let params: any = {
            "coin": coin,
            "address": address
        };
        return this.coboFetch("GET", "/v1/custody/internal_address_info_batch/", params);
    };

    getTransactionDetail = (id: string) => {
        let params: any = {
            "id": id,
        };
        return this.coboFetch("GET", "/v1/custody/transaction/", params);
    };

    getTransactionsById = (params: TransactionQueryParams) => {
        return this.coboFetch("GET", "/v1/custody/transactions_by_id/", params);
    };

    getTransactionsByTime = (params: TransactionQueryParams) => {
        return this.coboFetch("GET", "/v1/custody/transactions_by_time/", params);
    };

    getPendingTransactions = (params: TransactionQueryParams) => {
        return this.coboFetch("GET", "/v1/custody/pending_transactions/", params);
    };

    getPendingDepositDetails = (id: string) => {
        return this.coboFetch("GET", "/v1/custody/pending_transaction/", {"id": id});
    };

    getTransactionHistory = (params: string) => {
        return this.coboFetch("GET", "/v1/custody/transaction_history/", params);
    };

    withdraw = (params: WithdrawParams) => {
        return this.coboFetch("POST", "/v1/custody/new_withdraw_request/", params);
    };

    getWithdrawInfo = (id: string) => {
        return this.coboFetch("GET", "/v1/custody/withdraw_info_by_request_id/", {"request_id": id});
    };

    getStakingProductDetails = (id: string) => {
        return this.coboFetch("GET", "/v1/custody/staking_product/", {"product_id": id});
    };

    getStakingProductList = (coin = null, language = null) => {
        let params: any = {};
        if (coin != null) {
            params["coin"] = coin;
        }
        if (language != null) {
            params["language"] = language;
        }

        return this.coboFetch("GET", "/v1/custody/staking_products/", params);
    };

    stake = (productId: string, amount: string) => {
        let params: any = {
            "product_id": productId,
            "amount": amount
        };
        return this.coboFetch("POST", "/v1/custody/staking_stake/", params);
    };

    unstake = (productId: string, amount: string) => {
        let params: any = {
            "product_id": productId,
            "amount": amount
        };
        return this.coboFetch("POST", "/v1/custody/staking_unstake/", params);
    };

    getStakingData = (coin = null, language = null) => {
        let params: any = {};
        if (coin != null) {
            params["coin"] = coin;
        }
        if (language != null) {
            params["language"] = language;
        }
        return this.coboFetch("GET", "/v1/custody/stakings/", params);
    };

    getUnstakingData = (coin = null) => {
        let params: any = {};
        if (coin != null) {
            params["coin"] = coin;
        }
        return this.coboFetch("GET", "/v1/custody/unstakings/", params);
    };

    getStakingHistory = (params: StakingQueryParams) => {
        return this.coboFetch("GET", "/v1/custody/unstakings/", params);
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
        if (method == 'GET') {
            let url = this.host + path + '?' + sort_params;
            response = await fetch(url, {
                headers: headers,
                method: "GET"
            });
        } else if (method == 'POST') {
            let urlParams = new URLSearchParams();

            for (let k in params) {
                urlParams.append(k, params[k])
            }

            response = await fetch(this.host + path, {
                method: method,
                headers: headers,
                //@ts-ignore
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

export interface WithdrawParams {
    coin: string,
    request_id: string,
    address: string,
    amount: string,
    memo?: string,
    force_internal?: string,
    for_external?: string,
}

export interface StakingQueryParams {
    coin?: string,
    type?: string,
    max_id?: string,
    limit?: string,
    product_id?: string
}

export interface ApiResponse {
    success: boolean,
    result?: any,
    error_code: number,
    error_id: string
}
