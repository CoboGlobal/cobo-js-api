import fetch from 'node-fetch';
import { Signer } from "./Signer";
import { LocalSigner } from "./LocalSigner";
import { URLSearchParams } from "url"
import { Env } from "./Env";
import sha256 = require("sha256");
import { ApiResponse } from '..';

export class Web3Client {
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

    getWeb3SupportedChains = () => {
        return this.coboFetch("GET", "/v1/custody/web3_supported_chains/", {})
    }

    getWeb3SupportedCoins = (chain_code: string) => {
        let params: any = {"chain_code": chain_code}

        return this.coboFetch("GET", "/v1/custody/web3_supported_coins/", params)
    }

    getWeb3SupportedNftCollections = () => {
        return this.coboFetch("GET", "/v1/custody/web3_supported_nft_collections/", {})
    }

    getWeb3SupportedContracts = (chain_code: string) => {
        let params: any = {"chain_code": chain_code}
        return this.coboFetch("GET", "/v1/custody/web3_supported_contracts/", params)
    }

    getWeb3SupportedContractMethods = (chain_code: string, contract_address: string) => {
        let params: any = {"chain_code": chain_code, "contract_address": contract_address}
        
        return this.coboFetch("GET", "/v1/custody/web3_supported_contract_methods/", params)
    }

    batchWeb3NewAddress = (chain_code: string, count: number) => {
        let params: any = {
            "chain_code": chain_code,
            "count": count,
        }

        return this.coboFetch("POST", "/v1/custody/web3_add_addresses/", params)
    }

    getWeb3AddressList = (chain_code: string, page_index: number, page_length: number, sort_flag?: number) => {
        let params: any = {
            "chain_code": chain_code,
            "page_index": page_index,
            "page_length": page_length,
        }
        if (!!sort_flag) {
            params["sort_flag"] = sort_flag
        }

        return this.coboFetch("GET", "/v1/custody/web3_list_wallet_address/", params)
    }

    getWeb3WalletAssetList = (address: string, chain_code: string)=> {
        let params: any = {}
        if (!!address){
            params["address"] = address
        }
        if (!!chain_code) {
            params["chain_code"] = chain_code
        }

        return this.coboFetch("GET", "/v1/custody/web3_list_wallet_assets/", params)
    }

    getWeb3WalletNftList = (nft_code: string, address: string) => {
        let params: any = {
            "nft_code": nft_code,
        }
        if (!!address) {
            params["address"] = address
        }

        return this.coboFetch("GET", "/v1/custody/web3_list_wallet_nfts/", params)
    }

    getWeb3WalletNftDetail = (nft_code: string, token_id: string) => {
        let params: any = {
            "nft_code": nft_code,
            "token_id": token_id,
        }

        return this.coboFetch("GET", "/v1/custody/web3_wallet_nft_detail/", params)
    }

    web3Withdraw = (coin: string, request_id: string, from_addr: string, to_addr: string, amount: number) => {
        let params: any = {"coin": coin, "request_id": request_id, "from_addr": from_addr, "to_addr": to_addr, "amount": amount}

        return this.coboFetch("POST", "/v1/custody/web3_withdraw/", params)
    }

    getWeb3WithdrawTransaction = (request_id: string) => {
        let params: any = {"request_id": request_id}

        return this.coboFetch("GET", "/v1/custody/web3_get_withdraw_transaction/", params)
    }

    web3Contract = (chain_code: string, request_id: string, wallet_addr: string, contract_addr: string, method_id: string,
                  method_name: string, args: string, amount = 0)  => {
        let params: any = {"chain_code": chain_code,
                "request_id": request_id,
                "wallet_addr": wallet_addr,
                "contract_addr": contract_addr,
                "method_id": method_id,
                "method_name": method_name,
                "args": args,
                "amount": amount, }
        return this.coboFetch("POST", "/v1/custody/web3_contract/", params)
    }

    getWeb3ContractTransaction = (request_id: string) => {
        let params: any = {"request_id": request_id}

        return this.coboFetch("GET", "/v1/custody/web3_get_contract_transaction/", params)
    }

    listWeb3WalletTransactions = (address: string, chain_code?: string, max_id?: string, min_id?: string,
                                  limit = 50) => {
        let params: any = {"address": address, "limit": limit}
        if (!!chain_code) {
            params["chain_code"] = chain_code
        }
        if (!!max_id) {
            params["max_id"] = max_id
        }
        if (!!min_id) {
            params["min_id"] = min_id
        }
        
        return this.coboFetch("GET", "/v1/custody/web3_list_wallet_transactions/", params)
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

        if (!!this.debug) {
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
                if (!!params.hasOwnProperty(k)) {
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
        if (!!!sig || !ts) {
            throw Error("signature or ts null")
        }
        let json = await response.text();

        if (!!this.debug) {
            console.log("response <<<<<<<< \njson:", json, "\nsig:", sig, "\nts:", ts);
        }

        if (!!LocalSigner.verifyEccSignature(`${json}|${ts}`, sig, this.coboPub)) {
            return JSON.parse(json);
        }

        throw Error("signature verify failed!!!")
    }
}