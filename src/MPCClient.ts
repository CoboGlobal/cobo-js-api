import fetch from 'node-fetch';
import { Signer } from "./Signer";
import { LocalSigner } from "./LocalSigner";
import { URLSearchParams } from "url"
import { Env } from "./Env";
import sha256 = require("sha256");
import { ApiResponse } from '..';

export class MPCClient {
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

    GetSupportedChains = () => {
        let params: any = {}
        return this.coboFetch("GET", "/v1/custody/mpc/get_supported_chains/", params)
    }

    GetSupportedCoins = (chain_code: string) => {
        let params: any = { "chain_code": chain_code }
        return this.coboFetch("GET", "/v1/custody/mpc/get_supported_coins/", params)
    }

    GetSupportedNftCollections = (chain_code: string) => {
        let params: any = { "chain_code": chain_code }
        return this.coboFetch("GET", "/v1/custody/mpc/get_supported_nft_collections/", params)
    }


    GetWalletSupportedCoins = () => {
        let params: any = {}
        return this.coboFetch("GET", "/v1/custody/mpc/get_wallet_supported_coins/", params)
    }

    getCoinInfo = (coin: string) => {
        let params: any = {"coin": coin};
        return this.coboFetch("GET", "/v1/custody/mpc/coin_info/", params);
    };

    IsValidAddress = (coin: string, address: string) => {
        let params: any = { "coin": coin, "address": address }
        return this.coboFetch("GET", "/v1/custody/mpc/is_valid_address/", params)
    }


    GetMainAddress = (chain_code: string) => {
        let params: any = { "chain_code": chain_code }
        return this.coboFetch("GET", "/v1/custody/mpc/get_main_address/", params)
    }


    GenerateAddresses = (chain_code: string, count: number) => {
        let params: any = {
            "chain_code": chain_code,
            "count": count,
        }
        return this.coboFetch("POST", "/v1/custody/mpc/generate_addresses/", params)
    }

    GenerateAddressMemo = (chain_code: string, address: string, count: number) => {
        let params: any = {
            "chain_code": chain_code,
            "address": address,
            "count": count,
        }
        return this.coboFetch("POST", "/v1/custody/mpc/generate_address_memo/", params)
    }

    UpdateAddressDescription = (coin: string, address: string, description: string) => {
        let params: any = {
            "coin": coin,
            "address": address,
            "description": description
        }
        return this.coboFetch("POST", "/v1/custody/mpc/update_address_description/", params)
    }

    ListAddresses = (chain_code: string, start_id?: string, end_id?: string, limit?: number, sort?: number) => {
        let params: any = {
            "chain_code": chain_code,
        }

        if (!!start_id) {
            params["start_id"] = start_id
        }
        if (!!end_id) {
            params["end_id"] = end_id
        }
        if (!!limit) {
            params["limit"] = limit
        }
        if (!!sort) {
            params["sort"] = sort
        }

        return this.coboFetch("GET", "/v1/custody/mpc/list_addresses/", params)
    }

    GetBalance = (address: string, chain_code?: string, coin?: string) => {
        let params: any = {
            "address": address,
        }

        if (!!chain_code) {
            params["chain_code"] = chain_code
        }
        if (!!coin) {
            params["coin"] = coin
        }

        return this.coboFetch("GET", "/v1/custody/mpc/get_balance/", params)
    }

    ListBalances = (page_index: number, page_length: number, coin?: string, chain_code?: string) => {
        let params: any = {
            "page_index": page_index,
            "page_length": page_length
        }

        if (!!chain_code) {
            params["chain_code"] = chain_code
        }
        if (!!coin) {
            params["coin"] = coin
        }

        return this.coboFetch("GET", "/v1/custody/mpc/list_balances/", params)
    }

    ListSpendable = (coin: string, address?: string) => {
        let params: any = {
            "coin": coin,
        }

        if (!!address) {
            params["address"] = address
        }

        return this.coboFetch("GET", "/v1/custody/mpc/list_spendable/", params)
    }

    CreateTransaction = (coin: string, request_id: string, amount: string, from_addr?: string, to_addr?: string,
        to_address_details?: string, fee?: string, gas_price?: BigInt, gas_limit?: BigInt, operation?: number,
        extra_parameters?: string, max_fee?: BigInt, max_priority_fee?: BigInt, fee_amount?: BigInt, remark?: string,
        auto_fuel?: number, memo?: string) => {
        let params: any = {
            "coin": coin,
            "request_id": request_id,
            "amount": amount,
        }

        if (!!from_addr) {
            params["from_address"] = from_addr
        }
        if (!!to_addr) {
            params["to_address"] = to_addr
        }
        if (!!to_address_details) {
            params["to_address_details"] = to_address_details
        }
        if (!!fee) {
            params["fee"] = fee
        }
        if (!!gas_price) {
            params["gas_price"] = gas_price
        }
        if (!!gas_limit) {
            params["gas_limit"] = gas_limit
        }
        if (!!operation) {
            params["operation"] = operation
        }
        if (!!extra_parameters) {
            params["extra_parameters"] = extra_parameters
        }
        if (!!max_fee) {
            params["max_fee"] = max_fee
        }
        if (!!max_priority_fee) {
            params["max_priority_fee"] = max_priority_fee
        }
        if (!!fee_amount) {
            params["fee_amount"] = fee_amount
        }
        if (!!remark) {
            params["remark"] = remark
        }
        if (!!auto_fuel) {
            params["auto_fuel"] = auto_fuel
        }
        if (!!memo) {
            params["memo"] = memo
        }

        return this.coboFetch("POST", "/v1/custody/mpc/create_transaction/", params)
    }

    SignMessage = (chain_code: string, request_id: string, from_addr: string,
        sign_version: number, extra_parameters: string) => {
        let params: any = {
            "chain_code": chain_code,
            "request_id": request_id,
            "from_address": from_addr,
            "sign_version": sign_version,
            "extra_parameters": extra_parameters,
        }

        return this.coboFetch("POST", "/v1/custody/mpc/sign_message/", params)
    }

    DropTransaction = (cobo_id: string, request_id: string, gas_price?: BigInt, gas_limit?: BigInt, 
        fee?: string, fee_amount?: BigInt, auto_fuel?: number, extra_parameters?: string) => {
        let params: any = {
            "cobo_id": cobo_id,
            "request_id": request_id,
        }

        if (!!gas_price) {
            params["gas_price"] = gas_price
        }
        if (!!gas_limit) {
            params["gas_limit"] = gas_limit
        }
        if (!!fee) {
            params["fee"] = fee
        }
        if (!!fee_amount) {
            params["fee_amount"] = fee_amount
        }
        if (!!auto_fuel) {
            params["auto_fuel"] = auto_fuel
        }
        if (!!extra_parameters) {
            params["extra_parameters"] = extra_parameters
        }

        return this.coboFetch("POST", "/v1/custody/mpc/drop_transaction/", params)
    }

    SpeedupTransaction = (cobo_id: string, request_id: string, gas_price?: BigInt, gas_limit?: BigInt, 
        fee?: string, fee_amount?: BigInt, auto_fuel?: number, extra_parameters?: string) => {
        let params: any = {
            "cobo_id": cobo_id,
            "request_id": request_id,
        }

        if (!!gas_price) {
            params["gas_price"] = gas_price
        }
        if (!!gas_limit) {
            params["gas_limit"] = gas_limit
        }
        if (!!fee) {
            params["fee"] = fee
        }
        if (!!fee_amount) {
            params["fee_amount"] = fee_amount
        }
        if (!!auto_fuel) {
            params["auto_fuel"] = auto_fuel
        }
        if (!!extra_parameters) {
            params["extra_parameters"] = extra_parameters
        }

        return this.coboFetch("POST", "/v1/custody/mpc/speedup_transaction/", params)
    }

    TransactionsByRequestIds = (request_ids: string, status?: number) => {
        let params: any = { "request_ids": request_ids }

        if (!!status) {
            params["status"] = status
        }

        return this.coboFetch("GET", "/v1/custody/mpc/transactions_by_request_ids/", params)
    }

    TransactionsByCoboIds = (cobo_ids: string, status?: number) => {
        let params: any = { "cobo_ids": cobo_ids }

        if (!!status) {
            params["status"] = status
        }

        return this.coboFetch("GET", "/v1/custody/mpc/transactions_by_cobo_ids/", params)
    }

    TransactionsByTxHash = (tx_hash: string, transaction_type?: number) => {
        let params: any = { "tx_hash": tx_hash }

        if (!!transaction_type) {
            params["transaction_type"] = transaction_type
        }

        return this.coboFetch("GET", "/v1/custody/mpc/transactions_by_tx_hash/", params)
    }

    ListTransactions = (start_time?: number, end_time?: number, status?: number,
        order?: number, order_by?: string, transaction_type?: number,
        coins?: string, from_address?: string, to_address?: string, limit: number = 50) => {
        let params: any = {
            "limit": limit
        }

        if (!!start_time) {
            params["start_time"] = start_time
        }
        if (!!end_time) {
            params["end_time"] = end_time
        }
        if (!!status) {
            params["status"] = status
        }
        if (!!order) {
            params["order"] = order
        }
        if (!!order_by) {
            params["order_by"] = order_by
        }
        if (!!transaction_type) {
            params["transaction_type"] = transaction_type
        }
        if (!!coins) {
            params["coins"] = coins
        }
        if (!!from_address) {
            params["from_address"] = from_address
        }
        if (!!to_address) {
            params["to_address"] = to_address
        }

        return this.coboFetch("GET", "/v1/custody/mpc/list_transactions/", params)
    }

    EstimateFee = (coin: string, amount?: BigInt, address?: string, replace_cobo_id?: string,
        from_address?: string,
        to_address_details?: string, fee?: string, gas_price?: BigInt, gas_limit?: BigInt,
        extra_parameters?: string) => {
        let params: any = { "coin": coin }

        if (!!amount) {
            params["amount"] = amount
        }
        if (!!address) {
            params["address"] = address
        }
        if (!!replace_cobo_id) {
            params["replace_cobo_id"] = replace_cobo_id
        }
        if (!!from_address) {
            params["from_address"] = from_address
        }
        if (!!to_address_details) {
            params["to_address_details"] = to_address_details
        }
        if (!!fee) {
            params["fee"] = fee
        }
        if (!!gas_price) {
            params["gas_price"] = gas_price
        }
        if (!!gas_limit) {
            params["gas_limit"] = gas_limit
        }
        if (!!extra_parameters) {
            params["extra_parameters"] = extra_parameters
        }

        return this.coboFetch("GET", "/v1/custody/mpc/estimate_fee/", params)

    }

    ListTssNodeRequests = (request_type?: number, status?: number) => {
        let params: any = {}

        if (!!request_type) {
            params["request_type"] = request_type
        }
        if (!!status) {
            params["status"] = status
        }

        return this.coboFetch("GET", "/v1/custody/mpc/list_tss_node_requests/", params)
    }

    SignMessagesByRequestIds = (request_ids: string) => {
        let params: any = { "request_ids": request_ids }

        return this.coboFetch("GET", "/v1/custody/mpc/sign_messages_by_request_ids/", params)
    }

    SignMessagesByCoboIds = (cobo_ids: string) => {
        let params: any = { "cobo_ids": cobo_ids }

        return this.coboFetch("GET", "/v1/custody/mpc/sign_messages_by_cobo_ids/", params)
    }

    ListTssNode = () => {
        return this.coboFetch("GET", "/v1/custody/mpc/list_tss_node/", {})
    }

    RetryDoubleCheck = (request_id: string) => {
        let params: any = {"request_id": request_id}

        return this.coboFetch("POST", "/v1/custody/mpc/retry_double_check/", params)
    }

    LockSpendable = (coin: string, tx_hash: string, vout_n: number) => {
        let params: any = { "coin": coin, "tx_hash": tx_hash, "vout_n": vout_n }

        return this.coboFetch("POST", "/v1/custody/mpc/lock_spendable/", params)
    }

    UnlockSpendable = (coin: string, tx_hash: string, vout_n: number) => {
        let params: any = { "coin": coin, "tx_hash": tx_hash, "vout_n": vout_n }

        return this.coboFetch("POST", "/v1/custody/mpc/unlock_spendable/", params)
    }

    GetRareSatoshis = (coin: string, tx_hash: string, vout_n: number) => {
        let params: any = { "coin": coin, "tx_hash": tx_hash, "vout_n": vout_n }

        return this.coboFetch("GET", "/v1/custody/mpc/get_rare_satoshis/", params)
    }

    GetUTXOAssets = (coin: string, tx_hash: string, vout_n: number) => {
        let params: any = { "coin": coin, "tx_hash": tx_hash, "vout_n": vout_n }

        return this.coboFetch("GET", "/v1/custody/mpc/get_utxo_assets/", params)
    }

    GetOrdinalsInscription = (inscription_id: string) => {
        let params: any = { "inscription_id": inscription_id}

        return this.coboFetch("GET", "/v1/custody/mpc/get_ordinals_inscription/", params)
    }

    GetMaxSendAmount = (coin: string, fee_rate: string, to_address: string, from_address?: string,) => {
        let params: any = {
            "coin": coin,
            "fee_rate": fee_rate,
            "to_address": to_address,
        }

        if (!!from_address) {
            params["from_address"] = from_address
        }

        return this.coboFetch("GET", "/v1/custody/mpc/get_max_send_amount/", params)
    }

    BabylonPrepareStaking = (request_id: string, stake_info: string, fee_rate: string, max_staking_fee?: BigInt) => {
        let params: any = {
            "request_id": request_id,
            "stake_info": stake_info,
            "fee_rate": fee_rate,
        }

        if (!!max_staking_fee) {
            params["max_staking_fee"] = max_staking_fee
        }

        return this.coboFetch("POST", "/v1/custody/mpc/babylon/prepare_staking/", params)
    }

    BabylonReplaceStakingFee = (request_id: string, related_request_id: string, fee_rate: string, max_staking_fee?: BigInt) => {
        let params: any = {
            "request_id": request_id,
            "related_request_id": related_request_id,
            "fee_rate": fee_rate,
        }

        if (!!max_staking_fee) {
            params["max_staking_fee"] = max_staking_fee
        }
        return this.coboFetch("POST","/v1/custody/mpc/babylon/replace_staking_fee/", params)
    }

    BabylonBroadcastStakingTransaction = (request_id: string) => {
        let params: any = {
            "request_id": request_id,
        }

        return this.coboFetch("POST","/v1/custody/mpc/babylon/broadcast_staking_transaction/", params)
    }

    BabylonGetStakingInfo = (request_id: string) => {
        let params: any = {
            "request_id": request_id,
        }

        return this.coboFetch("GET","/v1/custody/mpc/babylon/get_staking_info/", params)
    }

    BabylonListWaitingBroadcastTransactions = (coin: string, address: string) => {
        let params: any = {
            "asset_coin": coin,
            "address": address,
        }

        return this.coboFetch("GET","/v1/custody/mpc/babylon/list_waiting_broadcast_transactions/", params)
    }


    
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