interface Args {
  host: string;
  port: number;
  user?: string;
  pass?: string;
}

export default class BitcoinRPC {
  url: string;
  auth: boolean = false;
  user?: string;
  pass?: string;

  async request(method: string, params: any[]): Promise<any> {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": this.auth
        ? `Basic ${btoa(`${this.user}:${this.pass}`)}`
        : "",
    });

    const response = await fetch(this.url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        method,
        params,
      }),
    });

    const json = await response.json();

    if (response.status === 200) {
      return json.result;
    }

    return Promise.reject(new Error(json.error.message));
  }

  constructor({ host, port, user, pass }: Args) {
    this.url = `http://${host}:${port}`;
    if (user && pass) {
      this.auth = true;
      this.user = user;
      this.pass = pass;
    }
  }

    /** Returns the hash of the best (tip) block in the most-work fully-validated chain. */
    async getbestblockhash() {
        return await this.request("getbestblockhash", []);
    }

    /** If verbosity is 0, returns a string that is serialized, hex-encoded data for block ‘hash’. */
    async getblock(blockhash: string, verbosity?: number) {
        return await this.request("getblock", [blockhash, verbosity]);
    }

    /** Returns an object containing various state info regarding blockchain processing. */
    async getblockchaininfo() {
        return await this.request("getblockchaininfo", []);
    }

    /** Returns the height of the most-work fully-validated chain. */
    async getblockcount() {
        return await this.request("getblockcount", []);
    }

    /** Retrieve a BIP 157 content filter for a particular block. */
    async getblockfilter(blockhash: string, filtertype: string) {
        return await this.request("getblockfilter", [blockhash, filtertype]);
    }

    /** Returns hash of block in best-block-chain at height provided. */
    async getblockhash(height: number) {
        return await this.request("getblockhash", [height]);
    }

    /** If verbose is false, returns a string that is serialized, hex-encoded data for blockheader ‘hash’. */
    async getblockheader(blockhash: string, verbose?: boolean) {
        return await this.request("getblockheader", [blockhash, verbose]);
    }

    /** Compute per block statistics for a given window. All amounts are in satoshis. */
    async getblockstats(hash_or_height: number | string, stats?: Array<{height: string, time: string}>) {
        return await this.request("getblockstats", [hash_or_height, stats]);
    }

    /** Return information about all known tips in the block tree, including the main chain as well as orphaned branches. */
    async getchaintips() {
        return await this.request("getchaintips", []);
    }

    /** Compute statistics about the total number and rate of transactions in the chain. */
    async getchaintxstats(nblocks: number, blockhash?: string) {
        return await this.request("getchaintxstats", [nblocks, blockhash]);
    }

    /** Returns the proof-of-work difficulty as a multiple of the minimum difficulty. */
    async getdifficulty() {
        return await this.request("getdifficulty", []);
    }

    /** If txid is in the mempool, returns all in-mempool ancestors. */
    async getmempoolancestors(txid: string, verbose?: boolean) {
        return await this.request("getmempoolancestors", [txid, verbose]);
    }

    /** If txid is in the mempool, returns all in-mempool descendants. */
    async getmempooldescendants(txid: string, verbose?: boolean) {
        return await this.request("getmempooldescendants", [txid, verbose]);
    }

    /** Returns mempool data for given transaction */
    async getmempoolentry(txid: string) {
        return await this.request("getmempoolentry", [txid]);
    }

    /** Returns details on the active state of the TX memory pool. */
    async getmempoolinfo() {
        return await this.request("getmempoolinfo", []);
    }

    /** Returns all transaction ids in memory pool as a json array of string transaction ids. */
    async getrawmempool(verbose?: boolean, mempool_sequence?: boolean) {
        return await this.request("getrawmempool", [verbose, mempool_sequence]);
    }

    /** Returns details about an unspent transaction output. */
    async gettxout(txid: string, n: number, includemempool?: boolean) {
        return await this.request("gettxout", [txid, n, includemempool]);
    }

    /** Returns a hex-encoded proof that “txid” was included in a block. */
    async gettxoutproof(txids: Array<string>, blockhash?: string) {
        return await this.request("gettxoutproof", [txids, blockhash]);
    }

    /** Returns statistics about the unspent transaction output set. */
    async gettxoutsetinfo(hash_type?: string) {
        return await this.request("gettxoutsetinfo", [hash_type]);
    }

    /** Treats a block as if it were received before others with the same work. */
    async preciousblock(blockhash: string) {
        return await this.request("preciousblock", [blockhash]);
    }

    /** */
    async pruneblockchain(height: number) {
        return await this.request("pruneblockchain", [height]);
    }

    /** Dumps the mempool to disk. It will fail until the previous dump is fully loaded. */
    async savemempool() {
        return await this.request("savemempool", []);
    }

    /** EXPERIMENTAL warning: this call may be removed or changed in future releases. */
    async scantxoutset(action: string, scanobjects?: Array<string | {desc: string, range: number | Array<number>}>) {
        return await this.request("scantxoutset", [action, scanobjects]);
    }

    /** Verifies blockchain database. */
    async verifychain(checklevel: number, nblocks?: number) {
        return await this.request("verifychain", [checklevel, nblocks]);
    }

    /**
     * Verifies that a proof points to a transaction in a block, returning the transaction it commits to
     * and throwing an RPC error if the block is not in our best chain
     */
    async verifytxoutproof(proof: string) {
        return await this.request("verifytxoutproof", [proof]);
    }

    /** Returns an object containing information about memory usage. */
    async getmemoryinfo(mode?: string) {
        return await this.request("getmemoryinfo", [mode]);
    }

    /** Returns details of the RPC server. */
    async getrpcinfo() {
        return await this.request("getrpcinfo", []);
    }

    /** List all commands, or get help for a specified command. */
    async help(command?: string) {
        return await this.request("help", [command]);
    }

    /** Gets and sets the logging configuration. */
    async logging(include?: Array<string>, exclude?: Array<string>) {
        return await this.request("logging", [include, exclude]);
    }

    /** Request a graceful shutdown of Bitcoin Core. */
    async stop() {
        return await this.request("stop", []);
    }

    /** Returns the total uptime of the server. */
    async uptime() {
        return await this.request("uptime", []);
    }

    /** Mine a block with a set of ordered transactions immediately to a specified address or descriptor (before the RPC call returns) */
    async generateblock(output: string, transactions: Array<string>) {
        return await this.request("generateblock", [output, transactions]);
    }

    /** Mine blocks immediately to a specified address (before the RPC call returns) */
    async generatetoaddress(nblocks: number, address: string, maxtries?: number) {
        return await this.request("generatetoaddress", [nblocks, address, maxtries]);
    }

    /** Mine blocks immediately to a specified descriptor (before the RPC call returns) */
    async generatetodescriptor(num_blocks: number, descriptor: string, maxtries?: number) {
        return await this.request("generatetodescriptor", [num_blocks, descriptor, maxtries]);
    }

    /** If the request parameters include a ‘mode’ key, that is used to explicitly select between the default ‘template’ request or a ‘proposal’. */
    async getblocktemplate(template_request: {mode: string, capabilities: Array<string>}) {
        return await this.request("getblocktemplate", [template_request]);
    }

    /** */
    async getwork(data?: string) {
        return await this.request("getwork", [data]);
    }

    /** Returns a json object containing mining-related information. */
    async getmininginfo() {
        return await this.request("getmininginfo", []);
    }

    /** Returns the estimated network hashes per second based on the last n blocks. */
    async getnetworkhashps(nblocks?: number, height?: number) {
        return await this.request("getnetworkhashps", [nblocks, height]);
    }

    /** Accepts the transaction into mined blocks at a higher (or lower) priority */
    async prioritisetransaction(txid: string, fee_delta: number, dummy?: number) {
        return await this.request("prioritisetransaction", [txid, fee_delta, dummy]);
    }

    /** Attempts to submit new block to network. */
    async submitblock(hexdata: string, dummy?: boolean) {
        return await this.request("submitblock", [hexdata, dummy]);
    }

    /** Decode the given hexdata as a header and submit it as a candidate chain tip if valid. */
    async submitheader(hexdata: string) {
        return await this.request("submitheader", [hexdata]);
    }

    /** Attempts to add or remove a node from the addnode list. */
    async addnode(node: string, command: string) {
        return await this.request("addnode", [node, command]);
    }

    /** Clear all banned IPs. */
    async clearbanned() {
        return await this.request("clearbanned", []);
    }

    /** Immediately disconnects from the specified peer node. */
    async disconnectnode(address: string, nodeid?: number) {
        return await this.request("disconnectnode", [address, nodeid]);
    }

    /**
     * Returns information about the given added node, or all added nodes
     * (note that onetry addnodes are not listed here)
     */
    async getaddednodeinfo(node?: string) {
        return await this.request("getaddednodeinfo", [node]);
    }

    /** Returns the number of connections to other nodes. */
    async getconnectioncount() {
        return await this.request("getconnectioncount", []);
    }

    /**
     * Returns information about network traffic, including bytes in, bytes out,
     * and current time.
     */
    async getnettotals() {
        return await this.request("getnettotals", []);
    }

    /** Returns an object containing various state info regarding P2P networking. */
    async getnetworkinfo() {
        return await this.request("getnetworkinfo", []);
    }

    /** Return known addresses which can potentially be used to find new nodes in the network */
    async getnodeaddresses(count?: number) {
        return await this.request("getnodeaddresses", [count]);
    }

    /** Returns data about each connected network node as a json array of objects. */
    async getpeerinfo() {
        return await this.request("getpeerinfo", []);
    }

    /** List all manually banned IPs/Subnets. */
    async listbanned() {
        return await this.request("listbanned", []);
    }

    /** Requests that a ping be sent to all other nodes, to measure ping time. */
    async ping() {
        return await this.request("ping", []);
    }

    /** Attempts to add or remove an IP/Subnet from the banned list. */
    async setban(subnet: string, command: string, bantime?: number, absolute?: boolean) {
        return await this.request("setban", [subnet, command, bantime, absolute]);
    }

    /** Disable/enable all p2p network activity. */
    async setnetworkactive(state: boolean) {
        return await this.request("setnetworkactive", [state]);
    }

    /** Analyzes and provides information about the current status of a PSBT and its inputs */
    async analyzepsbt(psbt: string) {
        return await this.request("analyzepsbt", [psbt]);
    }

    /** Combine multiple partially signed Bitcoin transactions into one transaction. */
    async combinepsbt(txs: Array<string>) {
        return await this.request("combinepsbt", [txs]);
    }

    /** Combine multiple partially signed transactions into one transaction. */
    async combinerawtransaction(txs: Array<string>) {
        return await this.request("combinerawtransaction", [txs]);
    }

    /**
     * Converts a network serialized transaction to a PSBT. This should be used only with createrawtransaction and fundrawtransaction
     * createpsbt and walletcreatefundedpsbt should be used for new applications.
     */
    async converttopsbt(hexstring: string, permitsigdata?: boolean, iswitness?: boolean) {
        return await this.request("converttopsbt", [hexstring, permitsigdata, iswitness]);
    }

    /** Creates a transaction in the Partially Signed Transaction format. */
    async createpsbt(inputs: Array<{txid: string, vout: number, sequence: number}>, outputs: Array<{address: number} | {address: string} | {data: string}>, locktime?: number, replaceable?: boolean) {
        return await this.request("createpsbt", [inputs, outputs, locktime, replaceable]);
    }

    /** Create a transaction spending the given inputs and creating new outputs. */
    async createrawtransaction(inputs: Array<{txid: string, vout: number, sequence: number}>, output: Array<{address: number} | {address: string} | {data: string}>, locktime?: number, replaceable?: boolean) {
        return await this.request("createrawtransaction", [inputs, output, locktime, replaceable]);
    }

    /** Return a JSON object representing the serialized, base64-encoded partially signed Bitcoin transaction. */
    async decodepsbt(psbt: string) {
        return await this.request("decodepsbt", [psbt]);
    }

    /** Return a JSON object representing the serialized, hex-encoded transaction. */
    async decoderawtransaction(hexstring: string, iswitness?: boolean) {
        return await this.request("decoderawtransaction", [hexstring, iswitness]);
    }

    /** Decode a hex-encoded script. */
    async decodescript(hexstring: string) {
        return await this.request("decodescript", [hexstring]);
    }

    /**
     * Finalize the inputs of a PSBT. If the transaction is fully signed, it will produce a
     * network serialized transaction which can be broadcast with sendrawtransaction. Otherwise a PSBT will be
     * created which has the final_scriptSig and final_scriptWitness fields filled for inputs that are complete.
     */
    async finalizepsbt(psbt: string, extract?: boolean) {
        return await this.request("finalizepsbt", [psbt, extract]);
    }

    /** If the transaction has no inputs, they will be automatically selected to meet its out value. */
    async fundrawtransaction(hexstring: string, options?: {add_inputs: boolean, changeAddress: string, changePosition: number, change_type: string, includeWatching: boolean, lockUnspents: boolean, fee_rate: number, feeRate: number, subtractFeeFromOutputs: Array<number>}, iswitness?: boolean) {
        return await this.request("fundrawtransaction", [hexstring, options, iswitness]);
    }

    /** Return the raw transaction data. */
    async getrawtransaction(txid: string, verbose?: boolean, blockhash?: string) {
        return await this.request("getrawtransaction", [txid, verbose, blockhash]);
    }

    /**
     * Joins multiple distinct PSBTs with different inputs and outputs into one PSBT with inputs and outputs from all of the PSBTs
     * No input in any of the PSBTs can be in more than one of the PSBTs.
     */
    async joinpsbts(psbts: Array<string>) {
        return await this.request("joinpsbts", [psbts]);
    }

    /** Submit a raw transaction (serialized, hex-encoded) to local node and network. */
    async sendrawtransaction(hexstring: string, maxfeerate?: number | string) {
        return await this.request("sendrawtransaction", [hexstring, maxfeerate]);
    }

    /** Sign inputs for raw transaction (serialized, hex-encoded). */
    async signrawtransactionwithkey(hexstring: string, privkeys: Array<string>, prevtxs?: Array<{txid: string, vout: number, scriptPubKey: string, redeemScript: string, witnessScript: string, amount: number}>, sighashtype?: string) {
        return await this.request("signrawtransactionwithkey", [hexstring, privkeys, prevtxs, sighashtype]);
    }

    /** Returns result of mempool acceptance tests indicating if raw transaction (serialized, hex-encoded) would be accepted by mempool. */
    async testmempoolaccept(rawtxs: Array<string>, maxfeerate?: number | string) {
        return await this.request("testmempoolaccept", [rawtxs, maxfeerate]);
    }

    /** Updates all segwit inputs and outputs in a PSBT with data from output descriptors, the UTXO set or the mempool. */
    async utxoupdatepsbt(psbt: string, descriptors?: Array<string | {desc: string, range: number | Array<number>}>) {
        return await this.request("utxoupdatepsbt", [psbt, descriptors]);
    }

    /** Creates a multi-signature address with n signature of m keys required. */
    async createmultisig() {
        return await this.request("createmultisig", []);
    }

    /** Derives one or more addresses corresponding to an output descriptor. */
    async deriveaddresses() {
        return await this.request("deriveaddresses", []);
    }

    /**
     * Estimates the approximate fee per kilobyte needed for a transaction to begin
     * confirmation within conf_target blocks if possible and return the number of blocks
     * for which the estimate is valid. Uses virtual transaction size as defined
     * in BIP 141 (witness data is discounted).
     */
    async estimatesmartfee() {
        return await this.request("estimatesmartfee", []);
    }

    /** Analyses a descriptor. */
    async getdescriptorinfo() {
        return await this.request("getdescriptorinfo", []);
    }

    /** Returns the status of one or all available indices currently running in the node. */
    async getindexinfo() {
        return await this.request("getindexinfo", []);
    }

    /** Sign a message with the private key of an address */
    async signmessagewithprivkey() {
        return await this.request("signmessagewithprivkey", []);
    }

    /** Return information about the given bitcoin address. */
    async validateaddress() {
        return await this.request("validateaddress", []);
    }

    /** Verify a signed message */
    async verifymessage() {
        return await this.request("verifymessage", []);
    }

    /**
     * Mark in-wallet transaction <txid> as abandoned
     * This will mark this transaction and all its in-wallet descendants as abandoned which will allow
     * for their inputs to be respent.  It can be used to replace “stuck” or evicted transactions.
     */
    async abandontransaction() {
        return await this.request("abandontransaction", []);
    }

    /** Stops current wallet rescan triggered by an RPC call, e.g. by an importprivkey call. */
    async abortrescan() {
        return await this.request("abortrescan", []);
    }

    /** Add an nrequired-to-sign multisignature address to the wallet. Requires a new wallet backup. */
    async addmultisigaddress() {
        return await this.request("addmultisigaddress", []);
    }

    /** Safely copies current wallet file to destination, which can be a directory or a path with filename. */
    async backupwallet() {
        return await this.request("backupwallet", []);
    }

    /** Bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction B. */
    async bumpfee() {
        return await this.request("bumpfee", []);
    }

    /** Creates and loads a new wallet. */
    async createwallet() {
        return await this.request("createwallet", []);
    }

    /** Reveals the private key corresponding to ‘address’. */
    async dumpprivkey() {
        return await this.request("dumpprivkey", []);
    }

    /** Dumps all wallet keys in a human-readable format to a server-side file. This does not allow overwriting existing files. */
    async dumpwallet() {
        return await this.request("dumpwallet", []);
    }

    /** Encrypts the wallet with ‘passphrase’. This is for first time encryption. */
    async encryptwallet() {
        return await this.request("encryptwallet", []);
    }

    /** */
    async getaddressbylabel() {
        return await this.request("getaddressbylabel", []);
    }

    /** Return information about the given bitcoin address. */
    async getaddressinfo() {
        return await this.request("getaddressinfo", []);
    }

    /** Returns the total available balance. */
    async getbalance() {
        return await this.request("getbalance", []);
    }

    /** Returns an object with all balances in BTC. */
    async getbalances() {
        return await this.request("getbalances", []);
    }

    /** Returns a new Bitcoin address for receiving payments. */
    async getnewaddress() {
        return await this.request("getnewaddress", []);
    }

    /** Returns a new Bitcoin address, for receiving change. */
    async getrawchangeaddress() {
        return await this.request("getrawchangeaddress", []);
    }

    /** Returns the total amount received by the given address in transactions with at least minconf confirmations. */
    async getreceivedbyaddress() {
        return await this.request("getreceivedbyaddress", []);
    }

    /** Returns the total amount received by addresses with <label> in transactions with at least [minconf] confirmations. */
    async getreceivedbylabel() {
        return await this.request("getreceivedbylabel", []);
    }

    /** Get detailed information about in-wallet transaction <txid> */
    async gettransaction() {
        return await this.request("gettransaction", []);
    }

    /**
     * DEPRECATED
     * Identical to getbalances().mine.untrusted_pending
     */
    async getunconfirmedbalance() {
        return await this.request("getunconfirmedbalance", []);
    }

    /** Returns an object containing various wallet state info. */
    async getwalletinfo() {
        return await this.request("getwalletinfo", []);
    }

    /** Adds an address or script (in hex) that can be watched as if it were in your wallet but cannot be used to spend. Requires a new wallet backup. */
    async importaddress() {
        return await this.request("importaddress", []);
    }

    /** Import descriptors. This will trigger a rescan of the blockchain based on the earliest timestamp of all descriptors being imported. Requires a new wallet backup. */
    async importdescriptors() {
        return await this.request("importdescriptors", []);
    }

    /** Import addresses/scripts (with private or public keys, redeem script (P2SH)), optionally rescanning the blockchain from the earliest creation time of the imported scripts. Requires a new wallet backup. */
    async importmulti() {
        return await this.request("importmulti", []);
    }

    /** Adds a private key (as returned by dumpprivkey) to your wallet. Requires a new wallet backup. */
    async importprivkey() {
        return await this.request("importprivkey", []);
    }

    /** Imports funds without rescan. Corresponding address or script must previously be included in wallet. Aimed towards pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported outputs or rescan after the point in the blockchain the transaction is included. */
    async importprunedfunds() {
        return await this.request("importprunedfunds", []);
    }

    /** Adds a public key (in hex) that can be watched as if it were in your wallet but cannot be used to spend. Requires a new wallet backup. */
    async importpubkey() {
        return await this.request("importpubkey", []);
    }

    /** Imports keys from a wallet dump file (see dumpwallet). Requires a new wallet backup to include imported keys. */
    async importwallet() {
        return await this.request("importwallet", []);
    }

    /** Fills the keypool. */
    async keypoolrefill() {
        return await this.request("keypoolrefill", []);
    }

    /**
     * Lists groups of addresses which have had their common ownership
     * made public by common use as inputs or as the resulting change
     * in past transactions
     */
    async listaddressgroupings() {
        return await this.request("listaddressgroupings", []);
    }

    /** Returns the list of all labels, or labels that are assigned to addresses with a specific purpose. */
    async listlabels() {
        return await this.request("listlabels", []);
    }

    /** Returns list of temporarily unspendable outputs. */
    async listlockunspent() {
        return await this.request("listlockunspent", []);
    }

    /** List balances by receiving address. */
    async listreceivedbyaddress() {
        return await this.request("listreceivedbyaddress", []);
    }

    /** List received transactions by label. */
    async listreceivedbylabel() {
        return await this.request("listreceivedbylabel", []);
    }

    /** Get all transactions in blocks since block [blockhash], or all transactions if omitted. */
    async listsinceblock() {
        return await this.request("listsinceblock", []);
    }

    /** If a label name is provided, this will return only incoming transactions paying to addresses with the specified label. */
    async listtransactions() {
        return await this.request("listtransactions", []);
    }

    /**
     * Returns array of unspent transaction outputs
     * with between minconf and maxconf (inclusive) confirmations.
     */
    async listunspent() {
        return await this.request("listunspent", []);
    }

    /** Returns a list of wallets in the wallet directory. */
    async listwalletdir() {
        return await this.request("listwalletdir", []);
    }

    /** Returns a list of currently loaded wallets. */
    async listwallets() {
        return await this.request("listwallets", []);
    }

    /** Loads a wallet from a wallet file or directory. */
    async loadwallet() {
        return await this.request("loadwallet", []);
    }

    /** Updates list of temporarily unspendable outputs. */
    async lockunspent() {
        return await this.request("lockunspent", []);
    }

    /** Bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction B. */
    async psbtbumpfee() {
        return await this.request("psbtbumpfee", []);
    }

    /** Deletes the specified transaction from the wallet. Meant for use with pruned wallets and as a companion to importprunedfunds. This will affect wallet balances. */
    async removeprunedfunds() {
        return await this.request("removeprunedfunds", []);
    }

    /** Rescan the local blockchain for wallet related transactions. */
    async rescanblockchain() {
        return await this.request("rescanblockchain", []);
    }

    /** EXPERIMENTAL warning: this call may be changed in future releases. */
    async send() {
        return await this.request("send", []);
    }

    /** Send multiple times. Amounts are double-precision floating point numbers. */
    async sendmany() {
        return await this.request("sendmany", []);
    }

    /** Send an amount to a given address. */
    async sendtoaddress() {
        return await this.request("sendtoaddress", []);
    }

    /**
     * Set or generate a new HD wallet seed. Non-HD wallets will not be upgraded to being a HD wallet. Wallets that are already
     * HD will have a new HD seed set so that new keys added to the keypool will be derived from this new seed.
     */
    async sethdseed() {
        return await this.request("sethdseed", []);
    }

    /** Sets the label associated with the given address. */
    async setlabel() {
        return await this.request("setlabel", []);
    }

    /** Set the transaction fee per kB for this wallet. Overrides the global -paytxfee command line parameter. */
    async settxfee() {
        return await this.request("settxfee", []);
    }

    /** Change the state of the given wallet flag for a wallet. */
    async setwalletflag() {
        return await this.request("setwalletflag", []);
    }

    /**
     * Sign a message with the private key of an address
     * Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted.
     */
    async signmessage() {
        return await this.request("signmessage", []);
    }

    /** Sign inputs for raw transaction (serialized, hex-encoded). */
    async signrawtransactionwithwallet() {
        return await this.request("signrawtransactionwithwallet", []);
    }

    /** Unloads the wallet referenced by the request endpoint otherwise unloads the wallet specified in the argument. */
    async unloadwallet() {
        return await this.request("unloadwallet", []);
    }

    /** Upgrade the wallet. Upgrades to the latest version if no version number is specified. */
    async upgradewallet() {
        return await this.request("upgradewallet", []);
    }

    /** Creates and funds a transaction in the Partially Signed Transaction format. */
    async walletcreatefundedpsbt() {
        return await this.request("walletcreatefundedpsbt", []);
    }

    /** Removes the wallet encryption key from memory, locking the wallet. */
    async walletlock() {
        return await this.request("walletlock", []);
    }

    /** Stores the wallet decryption key in memory for ‘timeout’ seconds. */
    async walletpassphrase() {
        return await this.request("walletpassphrase", []);
    }

    /** Changes the wallet passphrase from ‘oldpassphrase’ to ‘newpassphrase’. */
    async walletpassphrasechange() {
        return await this.request("walletpassphrasechange", []);
    }

    /**
     * Update a PSBT with input information from our wallet and then sign inputs
     * that we can sign for.
     */
    async walletprocesspsbt() {
        return await this.request("walletprocesspsbt", []);
    }
}

// const client = new BitcoinRPC({
//   host: "localhost",
//   port: 18332,
//   user: "user",
//   pass: "pass",
// });
type getbestblockhashResult = string;

interface getblockResult {
    hash: string;
    confirmations: number;
    size: number;
    strippedsize: number;
    weight: number;
    height: number;
    version: number;
    versionHex: string;
    merkleroot: string;
    tx: Array<string>;
    time: number;
    mediantime: number;
    nonce: number;
    bits: string;
    difficulty: number;
    chainwork: string;
    nTx: number;
    previousblockhash: string;
    nextblockhash: string;
}

interface getblockchaininfoResult {
    chain: string;
    blocks: number;
    headers: number;
    bestblockhash: string;
    difficulty: number;
    mediantime: number;
    verificationprogress: number;
    initialblockdownload: boolean;
    chainwork: string;
    size_on_disk: number;
    pruned: boolean;
    prunedheight: number;
    automatic_pruning: boolean;
    pruning_target_size: number;
    warnings: string;
}

type getblockcountResult = number;

interface getblockfilterResult {
    filter: string;
    header: string;
}

type getblockhashResult = string;
type getblockheaderResult = string;

interface getblockstatsResult {
    avgfee: number;
    avgfeerate: number;
    avgtxsize: number;
    blockhash: string;
    feerate_percentiles: Array<{ feerate: number }>;
    height: number;
    ins: number;
    maxfee: number;
    maxfeerate: number;
    maxtxsize: number;
    medianfee: number;
    mediantime: number;
    mediantxsize: number;
    minfee: number;
    minfeerate: number;
    mintxsize: number;
    outs: number;
    subsidy: number;
    swtotal_size: number;
    swtotal_weight: number;
    swtxs: number;
    time: number;
    total_out: number;
    total_size: number;
    total_weight: number;
    totalfee: number;
    txs: number;
    utxo_increase: number;
    utxo_size_inc: number;
}

type getchaintipsResult = Array<{height: number, hash: string, branchlen: number, status: string}>;

interface getchaintxstatsResult {
    time: number;
    txcount: number;
    window_final_block_hash: string;
    window_final_block_height: number;
    window_block_count: number;
    window_tx_count: number;
    window_interval: number;
    txrate: number;
}

type getdifficultyResult = number;
type getmempoolancestorsResult = Array<string>;
type getmempooldescendantsResult = Array<string>;

interface getmempoolentryResult {
    vsize: number;
    weight: number;
    fee: number;
    modifiedfee: number;
    time: number;
    height: number;
    descendantcount: number;
    descendantsize: number;
    descendantfees: number;
    ancestorcount: number;
    ancestorsize: number;
    ancestorfees: number;
    wtxid: string;
    fees: {base: number, modified: number, ancestor: number, descendant: number};
    depends: Array<string>;
    spentby: Array<string>;
    bip125replaceable: boolean;
    unbroadcast: boolean;
}

interface getmempoolinfoResult {
    loaded: boolean;
    size: number;
    bytes: number;
    usage: number;
    maxmempool: number;
    mempoolminfee: number;
    minrelaytxfee: number;
    unbroadcastcount: number;
}

type getrawmempoolResult = Array<string>;

interface gettxoutResult {
    bestblock: string;
    confirmations: number;
    value: number;
    scriptPubKey: {asm: string, hex: string,reqSigs: number, type: string, addresses: Array<string>};
    coinbase: boolean;
}

type gettxoutproofResult = string;

interface gettxoutsetinfoResult {
    height: number;
    bestblock: string;
    transactions: number;
    txouts: number;
    bogosize: number;
    hash_serialized_2: string;
    disk_size: number;
    total_amount: number;
}

type preciousblockResult = void;
type pruneblockchainResult = number;
type savemempoolResult = void;

interface scantxoutsetResult {
    success: boolean;
    txouts: number;
    height: number;
    bestblock: string;
    unspents: Array<{txid: string, vout: number, scriptPubKey: string, desc: string, amount: number, height: number}>;
    total_amount: number;
}

type verifychainResult = boolean;
type verifytxoutproofResult = Array<{hex: string}>;
type getmemoryinfoResult = {used: number, free: number, total: number, locked: number, chunks_used: number, chunks_free: number};

interface getrpcinfoResult {
    active_commands: Array<{method: string, duration: number}>;
    logpath: string;
}

type helpResult = string;

interface loggingResult {
    addrman: boolean;
    bench: boolean;
    blockstorage: boolean;
    cmpctblock: boolean;
    coindb: boolean;
    estimatefee: boolean;
    http: boolean;
    i2p: boolean;
    ipc: boolean;
    leveldb: boolean;
    libevent: boolean;
    mempool: boolean;
    mempoolrej: boolean;
    net: boolean;
    proxy: boolean;
    prune: boolean;
    qt: boolean;
    rand: boolean;
    reindex: boolean;
    rpc: boolean;
    selectcoins: boolean;
    tor: boolean;
    utils: boolean;
    validation: boolean;
    walletdb: boolean;
    zmq: boolean;
}

type stopResult = string;
type uptimeResult = number;
type generateblockResult = string;
type generatetoaddressResult = Array<string>;
type generatetodescriptorResult = Array<string>;

interface getblocktemplateResult {
    version: number;
    rules: Array<string>;
    vbavailable: Array<number>;
    vbrequired: number;
    previousblockhash: string;
    transactions: Array<{data: string, txid: string, hash: string, depends: Array<number>, fee: number, sigops: number, weight: number}>;
    coinbaseaux: object;
    coinbasevalue: number;
    longpollid: string;
    target: string;
    mintime: number;
    mutable: Array<string>;
    noncerange: string;
    sigoplimit: number;
    sizelimit: number;
    curtime: number;
    bits: string;
    height: number;
    default_witness_commitment: string;
}

interface getworkResult {
    data: string;
    hash1: string;
    midstate: string;
    target: string;
}

interface getmininginfoResult {
    blocks: number;
    currentblockweight: number;
    currentblocktx: number;
    difficulty: number;
    networkhashps: number;
    pooledtx: number;
    chain: string;
    warnings: string;
}

type getnetworkhashpsResult = number;
type prioritisetransactionResult = boolean;
type submitblockResult = void;
type submitheaderResult = void;
type addnodeResult = void;
type clearbannedResult = void;
type disconnectnodeResult = void;

interface getaddednodeinfoResult {
    addednode: string;
    connected: boolean;
    addresses: Array<{address: string, connected: string}>;
}

type getconnectioncountResult = number;

interface getnettotalsResult {
    totalbytesrecv: number;
    totalbytessent: number;
    timemillis: number;
    uploadtarget: {timeframe: number, target: number, target_reached: boolean, serve_historical_blocks: boolean, bytes_left_in_cycle: number, time_left_in_cycle: number};
}

interface getnetworkinfoResult {
    version: number;
    subversion: string;
    protocolversion: number;
    localservices: number;
    localservicesnames: Array<string>;
    localrelay: boolean;
    timeoffset: number;
    connections: number;
    connections_in: number;
    connections_out: number;
    networkactive: boolean;
    networks: Array<{name: string, limited: boolean, reachable: boolean, proxy: string, proxy_randomize_credentials: boolean}>;
    relayfee: number;
    incrementalfee: number;
    localaddresses: Array<{address: string, port: number, score: number}>;
    warnings: string;
}

type getnodeaddressesResult = Array<{time: number, services: number, address: string, port: number}>;
type getpeerinfoResult = Array<{id: number, addr: string, addrbind: string, addrlocal: string, network: string, mapped_as: number, services: string, servicesnames: Array<string>, relaytxes: boolean, lastsend: number, lastrecv: number, last_transaction: number, last_block: number, bytessent: number, bytesrecv: number, conntime: number, timeoffset: number, pingtime: number, minping: number, pingwait: number, version: number, subver: string, inbound: boolean, addnode: boolean, connection_type: string, startingheight: number, banscore: number, synced_headers: number, synced_blocks: number, inflight: Array<number>, whitelisted: boolean, permissions: Array<string>, minfeefilter: number, bytessent_per_msg: object, bytesrecv_per_msg: object}>;
type listbannedResult = Array<{address: string, banned_until: number, ban_created: number}>;
type pingResult = void;
type setbanResult = void;
type setnetworkactiveResult = boolean;

interface analyzepsbtResult {
    inputs: Array<{has_utxo: boolean, is_final: boolean, missing: {pubkeys: Array<string>, signatures: Array<string>, redeemscript: string, witnessscript: string}, next: string}>;
    estimated_vsize: number;
    estimated_feerate: number;
    fee: number;
    next: string;
    error: string;
}

type combinepsbtResult = string;
type combinerawtransactionResult = string;
type converttopsbtResult = string;
type createpsbtResult = string;
type createrawtransactionResult = string;

interface decodepsbtResult {
    tx: {txid: string, hash: string, size: number, vsize: number, weight: number, version: number, locktime: number, vin: Array<{txid: string, vout: number, scriptSig: {asM: string, hex: string}, txinwitness: Array<string>, sequence: number}>, vout: Array<{value: number, n: number, scriptPubKey: {asm: string, hex: string, reqSigs: number, type: string, addresses: Array<string>}}>};
    unknown: object;
    inputs: Array<{non_witness_utxo: object, witness_utxo: {amount: number, scriptPubKey: {asm: string, hex: string, type: string, address: string}}, partial_signatures: object, sighash: string, redeem_script: {asm: string, hex: string, type: string}, witness_script: {asm: string, hex: string, type: string}, bip32_derivs: Array<{master_fingerprint: string, path: string}>, final_scriptsig: {asm: string, hex: string}, final_scriptwitness: Array<string>, unknown: object}>;
    outputs: Array<{redeem_script: {asm: string, hex: string, type: string}, witness_script: {asm:string, hex: string, type: string}, bip32_derivs: Array<{pubkey: string, master_fingerprint: string, path: string}>, unknown: object}>;
}

interface decoderawtransactionResult {
    txid: string;
    hash: string;
    size: number;
    vsize: number;
    weight: number;
    version: number;
    locktime: number;
    vin: Array<{txid: string, vout: number, scriptSig: {asm: string, hex: string}, txinwitness: {hex: string}, sequence: number}>;
    vout: Array<{value: number, n: number, scriptPubKey: {asm: string, hex: string, reqSigs: number, type: string, addresses: Array<string>}}>;
}

interface decodescriptResult {
    asm: string;
    type: string;
    reqSigs: number;
    addresses: Array<string>;
    p2sh: string;
    segwit: {asm: string, hex: string, type: string, reqSigs: number, addresses: Array<string>, p2shsegwit: string};
}

interface finalizepsbtResult {
    psbt: string;
    hex: string;
    complete: boolean;
}

interface fundrawtransactionResult {
    hex: string;
    fee: number;
    changepos: number;
}

type getrawtransactionResult = string;
type joinpsbtsResult = string;
type sendrawtransactionResult = string;

interface signrawtransactionwithkeyResult {
    hex: string;
    complete: boolean;
    errors: Array<{txid: string, vout: number, scriptSig: string, sequence: number, error: string}>;
}

type testmempoolacceptResult = Array<{txid: string, allowed: boolean, vsize: number, fees: {base: number}, rejectreason: string}>;
type utxoupdatepsbtResult = string;
type createmultisigResult = void;
type deriveaddressesResult = void;
type estimatesmartfeeResult = void;
type getdescriptorinfoResult = void;
type getindexinfoResult = void;
type signmessagewithprivkeyResult = void;
type validateaddressResult = void;
type verifymessageResult = void;
type abandontransactionResult = void;
type abortrescanResult = void;
type addmultisigaddressResult = void;
type backupwalletResult = void;
type bumpfeeResult = void;
type createwalletResult = void;
type dumpprivkeyResult = void;
type dumpwalletResult = void;
type encryptwalletResult = void;
type getaddressbylabelResult = void;
type getaddressinfoResult = void;
type getbalanceResult = void;
type getbalancesResult = void;
type getnewaddressResult = void;
type getrawchangeaddressResult = void;
type getreceivedbyaddressResult = void;
type getreceivedbylabelResult = void;
type gettransactionResult = void;
type getunconfirmedbalanceResult = void;
type getwalletinfoResult = void;
type importaddressResult = void;
type importdescriptorsResult = void;
type importmultiResult = void;
type importprivkeyResult = void;
type importprunedfundsResult = void;
type importpubkeyResult = void;
type importwalletResult = void;
type keypoolrefillResult = void;
type listaddressgroupingsResult = void;
type listlabelsResult = void;
type listlockunspentResult = void;
type listreceivedbyaddressResult = void;
type listreceivedbylabelResult = void;
type listsinceblockResult = void;
type listtransactionsResult = void;
type listunspentResult = void;
type listwalletdirResult = void;
type listwalletsResult = void;
type loadwalletResult = void;
type lockunspentResult = void;
type psbtbumpfeeResult = void;
type removeprunedfundsResult = void;
type rescanblockchainResult = void;
type sendResult = void;
type sendmanyResult = void;
type sendtoaddressResult = void;
type sethdseedResult = void;
type setlabelResult = void;
type settxfeeResult = void;
type setwalletflagResult = void;
type signmessageResult = void;
type signrawtransactionwithwalletResult = void;
type unloadwalletResult = void;
type upgradewalletResult = void;
type walletcreatefundedpsbtResult = void;
type walletlockResult = void;
type walletpassphraseResult = void;
type walletpassphrasechangeResult = void;
type walletprocesspsbtResult = void;
