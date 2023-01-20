interface Args {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export default class BitcoinRPC {
  url: string;
  auth: boolean = false;
  user?: string;
  pass?: string;

  /** Make a request to the Bitcoin JSON RPC.
   * @param {string} method - The method to call.
   * @param {any[]} params - The parameters to pass to the method.
   */
  async request(method: string, params: any[]) {
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

  /** initializes a new instance of the BitcoinRPC class.
   * @param {Args} args - The arguments to create the BitcoinRPC - host, port, username, password.
   */
  constructor({ host, port, username, password }: Args) {
    this.url = `http://${host}:${port}`;
    if (username && password) {
      this.auth = true;
      this.user = username;
      this.pass = password;
    }
  }

    /**
     * Returns the hash of the best (tip) block in the most-work fully-validated chain.
     * https://developer.bitcoin.org/reference/rpc/getbestblockhash.html
     */
    async getbestblockhash() {
        return await this.request("getbestblockhash", []);
    }

    /**
     * If verbosity is 0, returns a string that is serialized, hex-encoded data for block ‘hash’.
     * https://developer.bitcoin.org/reference/rpc/getblock.html
     */
    async getblock(blockhash: string, verbosity?: number) {
        return await this.request("getblock", [blockhash, verbosity]);
    }

    /**
     * Returns an object containing various state info regarding blockchain processing.
     * https://developer.bitcoin.org/reference/rpc/getblockchaininfo.html
     */
    async getblockchaininfo() {
        return await this.request("getblockchaininfo", []);
    }

    /**
     * Returns the height of the most-work fully-validated chain.
     * https://developer.bitcoin.org/reference/rpc/getblockcount.html
     */
    async getblockcount() {
        return await this.request("getblockcount", []);
    }

    /**
     * Retrieve a BIP 157 content filter for a particular block.
     * https://developer.bitcoin.org/reference/rpc/getblockfilter.html
     */
    async getblockfilter(blockhash: string, filtertype: string) {
        return await this.request("getblockfilter", [blockhash, filtertype]);
    }

    /**
     * Returns hash of block in best-block-chain at height provided.
     * https://developer.bitcoin.org/reference/rpc/getblockhash.html
     */
    async getblockhash(height: number) {
        return await this.request("getblockhash", [height]);
    }

    /**
     * If verbose is false, returns a string that is serialized, hex-encoded data for blockheader ‘hash’.
     * https://developer.bitcoin.org/reference/rpc/getblockheader.html
     */
    async getblockheader(blockhash: string, verbose?: boolean) {
        return await this.request("getblockheader", [blockhash, verbose]);
    }

    /**
     * Compute per block statistics for a given window. All amounts are in satoshis.
     * https://developer.bitcoin.org/reference/rpc/getblockstats.html
     */
    async getblockstats(hash_or_height: number | string, stats?: Array<string>) {
        return await this.request("getblockstats", [hash_or_height, stats]);
    }

    /**
     * Return information about all known tips in the block tree, including the main chain as well as orphaned branches.
     * https://developer.bitcoin.org/reference/rpc/getchaintips.html
     */
    async getchaintips() {
        return await this.request("getchaintips", []);
    }

    /**
     * Compute statistics about the total number and rate of transactions in the chain.
     * https://developer.bitcoin.org/reference/rpc/getchaintxstats.html
     */
    async getchaintxstats(nblocks: number, blockhash?: string) {
        return await this.request("getchaintxstats", [nblocks, blockhash]);
    }

    /**
     * Returns the proof-of-work difficulty as a multiple of the minimum difficulty.
     * https://developer.bitcoin.org/reference/rpc/getdifficulty.html
     */
    async getdifficulty() {
        return await this.request("getdifficulty", []);
    }

    /**
     * If txid is in the mempool, returns all in-mempool ancestors.
     * https://developer.bitcoin.org/reference/rpc/getmempoolancestors.html
     */
    async getmempoolancestors(txid: string, verbose?: boolean) {
        return await this.request("getmempoolancestors", [txid, verbose]);
    }

    /**
     * If txid is in the mempool, returns all in-mempool descendants.
     * https://developer.bitcoin.org/reference/rpc/getmempooldescendants.html
     */
    async getmempooldescendants(txid: string, verbose?: boolean) {
        return await this.request("getmempooldescendants", [txid, verbose]);
    }

    /**
     * Returns mempool data for given transaction
     * https://developer.bitcoin.org/reference/rpc/getmempoolentry.html
     */
    async getmempoolentry(txid: string) {
        return await this.request("getmempoolentry", [txid]);
    }

    /**
     * Returns details on the active state of the TX memory pool.
     * https://developer.bitcoin.org/reference/rpc/getmempoolinfo.html
     */
    async getmempoolinfo() {
        return await this.request("getmempoolinfo", []);
    }

    /**
     * Returns all transaction ids in memory pool as a json array of string transaction ids.
     * https://developer.bitcoin.org/reference/rpc/getrawmempool.html
     */
    async getrawmempool(verbose?: boolean, mempool_sequence?: boolean) {
        return await this.request("getrawmempool", [verbose, mempool_sequence]);
    }

    /**
     * Returns details about an unspent transaction output.
     * https://developer.bitcoin.org/reference/rpc/gettxout.html
     */
    async gettxout(txid: string, n: number, includemempool?: boolean) {
        return await this.request("gettxout", [txid, n, includemempool]);
    }

    /**
     * Returns a hex-encoded proof that “txid” was included in a block.
     * https://developer.bitcoin.org/reference/rpc/gettxoutproof.html
     */
    async gettxoutproof(txids: Array<string>, blockhash?: string) {
        return await this.request("gettxoutproof", [txids, blockhash]);
    }

    /**
     * Returns statistics about the unspent transaction output set.
     * https://developer.bitcoin.org/reference/rpc/gettxoutsetinfo.html
     */
    async gettxoutsetinfo(hash_type?: string) {
        return await this.request("gettxoutsetinfo", [hash_type]);
    }

    /**
     * Treats a block as if it were received before others with the same work.
     * https://developer.bitcoin.org/reference/rpc/preciousblock.html
     */
    async preciousblock(blockhash: string) {
        return await this.request("preciousblock", [blockhash]);
    }

    /**
     * https://developer.bitcoin.org/reference/rpc/pruneblockchain.html
     */
    async pruneblockchain(height: number) {
        return await this.request("pruneblockchain", [height]);
    }

    /**
     * Dumps the mempool to disk. It will fail until the previous dump is fully loaded.
     * https://developer.bitcoin.org/reference/rpc/savemempool.html
     */
    async savemempool() {
        return await this.request("savemempool", []);
    }

    /**
     * EXPERIMENTAL warning: this call may be removed or changed in future releases.
     * https://developer.bitcoin.org/reference/rpc/scantxoutset.html
     */
    async scantxoutset(action: string, scanobjects?: Array<string | {desc: string, range?: number | Array<number>}>) {
        return await this.request("scantxoutset", [action, scanobjects]);
    }

    /**
     * Verifies blockchain database.
     * https://developer.bitcoin.org/reference/rpc/verifychain.html
     */
    async verifychain(checklevel: number, nblocks?: number) {
        return await this.request("verifychain", [checklevel, nblocks]);
    }

    /**
     * Verifies that a proof points to a transaction in a block, returning the transaction it commits to
     * and throwing an RPC error if the block is not in our best chain
     * https://developer.bitcoin.org/reference/rpc/verifytxoutproof.html
     */
    async verifytxoutproof(proof: string) {
        return await this.request("verifytxoutproof", [proof]);
    }

    /**
     * Returns an object containing information about memory usage.
     * https://developer.bitcoin.org/reference/rpc/getmemoryinfo.html
     */
    async getmemoryinfo(mode?: string) {
        return await this.request("getmemoryinfo", [mode]);
    }

    /**
     * Returns details of the RPC server.
     * https://developer.bitcoin.org/reference/rpc/getrpcinfo.html
     */
    async getrpcinfo() {
        return await this.request("getrpcinfo", []);
    }

    /**
     * List all commands, or get help for a specified command.
     * https://developer.bitcoin.org/reference/rpc/help.html
     */
    async help(command?: string) {
        return await this.request("help", [command]);
    }

    /**
     * Gets and sets the logging configuration.
     * https://developer.bitcoin.org/reference/rpc/logging.html
     */
    async logging(include?: Array<string>, exclude?: Array<string>) {
        return await this.request("logging", [include, exclude]);
    }

    /**
     * Request a graceful shutdown of Bitcoin Core.
     * https://developer.bitcoin.org/reference/rpc/stop.html
     */
    async stop() {
        return await this.request("stop", []);
    }

    /**
     * Returns the total uptime of the server.
     * https://developer.bitcoin.org/reference/rpc/uptime.html
     */
    async uptime() {
        return await this.request("uptime", []);
    }

    /**
     * Mine a block with a set of ordered transactions immediately to a specified address or descriptor (before the RPC call returns)
     * https://developer.bitcoin.org/reference/rpc/generateblock.html
     */
    async generateblock(output: string, transactions: Array<string>) {
        return await this.request("generateblock", [output, transactions]);
    }

    /**
     * Mine blocks immediately to a specified address (before the RPC call returns)
     * https://developer.bitcoin.org/reference/rpc/generatetoaddress.html
     */
    async generatetoaddress(nblocks: number, address: string, maxtries?: number) {
        return await this.request("generatetoaddress", [nblocks, address, maxtries]);
    }

    /**
     * Mine blocks immediately to a specified descriptor (before the RPC call returns)
     * https://developer.bitcoin.org/reference/rpc/generatetodescriptor.html
     */
    async generatetodescriptor(num_blocks: number, descriptor: string, maxtries?: number) {
        return await this.request("generatetodescriptor", [num_blocks, descriptor, maxtries]);
    }

    /**
     * If the request parameters include a ‘mode’ key, that is used to explicitly select between the default ‘template’ request or a ‘proposal’.
     * https://developer.bitcoin.org/reference/rpc/getblocktemplate.html
     */
    async getblocktemplate(template_request: {mode?: string, capabilities?: Array<string>}) {
        return await this.request("getblocktemplate", [template_request]);
    }

    /**
     * https://developer.bitcoin.org/reference/rpc/getwork.html
     */
    async getwork(data?: string) {
        return await this.request("getwork", [data]);
    }

    /**
     * Returns a json object containing mining-related information.
     * https://developer.bitcoin.org/reference/rpc/getmininginfo.html
     */
    async getmininginfo() {
        return await this.request("getmininginfo", []);
    }

    /**
     * Returns the estimated network hashes per second based on the last n blocks.
     * https://developer.bitcoin.org/reference/rpc/getnetworkhashps.html
     */
    async getnetworkhashps(nblocks?: number, height?: number) {
        return await this.request("getnetworkhashps", [nblocks, height]);
    }

    /**
     * Accepts the transaction into mined blocks at a higher (or lower) priority
     * https://developer.bitcoin.org/reference/rpc/prioritisetransaction.html
     */
    async prioritisetransaction(txid: string, fee_delta: number, dummy?: number) {
        return await this.request("prioritisetransaction", [txid, fee_delta, dummy]);
    }

    /**
     * Attempts to submit new block to network.
     * https://developer.bitcoin.org/reference/rpc/submitblock.html
     */
    async submitblock(hexdata: string, dummy?: boolean) {
        return await this.request("submitblock", [hexdata, dummy]);
    }

    /**
     * Decode the given hexdata as a header and submit it as a candidate chain tip if valid.
     * https://developer.bitcoin.org/reference/rpc/submitheader.html
     */
    async submitheader(hexdata: string) {
        return await this.request("submitheader", [hexdata]);
    }

    /**
     * Attempts to add or remove a node from the addnode list.
     * https://developer.bitcoin.org/reference/rpc/addnode.html
     */
    async addnode(node: string, command: string) {
        return await this.request("addnode", [node, command]);
    }

    /**
     * Clear all banned IPs.
     * https://developer.bitcoin.org/reference/rpc/clearbanned.html
     */
    async clearbanned() {
        return await this.request("clearbanned", []);
    }

    /**
     * Immediately disconnects from the specified peer node.
     * https://developer.bitcoin.org/reference/rpc/disconnectnode.html
     */
    async disconnectnode(address: string, nodeid?: number) {
        return await this.request("disconnectnode", [address, nodeid]);
    }

    /**
     * Returns information about the given added node, or all added nodes
     * (note that onetry addnodes are not listed here)
     * https://developer.bitcoin.org/reference/rpc/getaddednodeinfo.html
     */
    async getaddednodeinfo(node?: string) {
        return await this.request("getaddednodeinfo", [node]);
    }

    /**
     * Returns the number of connections to other nodes.
     * https://developer.bitcoin.org/reference/rpc/getconnectioncount.html
     */
    async getconnectioncount() {
        return await this.request("getconnectioncount", []);
    }

    /**
     * Returns information about network traffic, including bytes in, bytes out,
     * and current time.
     * https://developer.bitcoin.org/reference/rpc/getnettotals.html
     */
    async getnettotals() {
        return await this.request("getnettotals", []);
    }

    /**
     * Returns an object containing various state info regarding P2P networking.
     * https://developer.bitcoin.org/reference/rpc/getnetworkinfo.html
     */
    async getnetworkinfo() {
        return await this.request("getnetworkinfo", []);
    }

    /**
     * Return known addresses which can potentially be used to find new nodes in the network
     * https://developer.bitcoin.org/reference/rpc/getnodeaddresses.html
     */
    async getnodeaddresses(count?: number) {
        return await this.request("getnodeaddresses", [count]);
    }

    /**
     * Returns data about each connected network node as a json array of objects.
     * https://developer.bitcoin.org/reference/rpc/getpeerinfo.html
     */
    async getpeerinfo() {
        return await this.request("getpeerinfo", []);
    }

    /**
     * List all manually banned IPs/Subnets.
     * https://developer.bitcoin.org/reference/rpc/listbanned.html
     */
    async listbanned() {
        return await this.request("listbanned", []);
    }

    /**
     * Requests that a ping be sent to all other nodes, to measure ping time.
     * https://developer.bitcoin.org/reference/rpc/ping.html
     */
    async ping() {
        return await this.request("ping", []);
    }

    /**
     * Attempts to add or remove an IP/Subnet from the banned list.
     * https://developer.bitcoin.org/reference/rpc/setban.html
     */
    async setban(subnet: string, command: string, bantime?: number, absolute?: boolean) {
        return await this.request("setban", [subnet, command, bantime, absolute]);
    }

    /**
     * Disable/enable all p2p network activity.
     * https://developer.bitcoin.org/reference/rpc/setnetworkactive.html
     */
    async setnetworkactive(state: boolean) {
        return await this.request("setnetworkactive", [state]);
    }

    /**
     * Analyzes and provides information about the current status of a PSBT and its inputs
     * https://developer.bitcoin.org/reference/rpc/analyzepsbt.html
     */
    async analyzepsbt(psbt: string) {
        return await this.request("analyzepsbt", [psbt]);
    }

    /**
     * Combine multiple partially signed Bitcoin transactions into one transaction.
     * https://developer.bitcoin.org/reference/rpc/combinepsbt.html
     */
    async combinepsbt(txs: Array<string>) {
        return await this.request("combinepsbt", [txs]);
    }

    /**
     * Combine multiple partially signed transactions into one transaction.
     * https://developer.bitcoin.org/reference/rpc/combinerawtransaction.html
     */
    async combinerawtransaction(txs: Array<string>) {
        return await this.request("combinerawtransaction", [txs]);
    }

    /**
     * Converts a network serialized transaction to a PSBT. This should be used only with createrawtransaction and fundrawtransaction
     * createpsbt and walletcreatefundedpsbt should be used for new applications.
     * https://developer.bitcoin.org/reference/rpc/converttopsbt.html
     */
    async converttopsbt(hexstring: string, permitsigdata?: boolean, iswitness?: boolean) {
        return await this.request("converttopsbt", [hexstring, permitsigdata, iswitness]);
    }

    /**
     * Creates a transaction in the Partially Signed Transaction format.
     * https://developer.bitcoin.org/reference/rpc/createpsbt.html
     */
    async createpsbt(inputs: Array<{txid: string, vout?: number, sequence?: number}>, outputs: Array<{address: number} | {address: string} | {data: string}>, locktime?: number, replaceable?: boolean) {
        return await this.request("createpsbt", [inputs, outputs, locktime, replaceable]);
    }

    /**
     * Create a transaction spending the given inputs and creating new outputs.
     * https://developer.bitcoin.org/reference/rpc/createrawtransaction.html
     */
    async createrawtransaction(inputs: Array<{txid: string, vout: number, sequence?: number}>, output: Array<{[address: string]: number} | {[address: string]: string} | {data: string}>, locktime?: number, replaceable?: boolean) {
        return await this.request("createrawtransaction", [inputs, output, locktime, replaceable]);
    }

    /**
     * Return a JSON object representing the serialized, base64-encoded partially signed Bitcoin transaction.
     * https://developer.bitcoin.org/reference/rpc/decodepsbt.html
     */
    async decodepsbt(psbt: string) {
        return await this.request("decodepsbt", [psbt]);
    }

    /**
     * Return a JSON object representing the serialized, hex-encoded transaction.
     * https://developer.bitcoin.org/reference/rpc/decoderawtransaction.html
     */
    async decoderawtransaction(hexstring: string, iswitness?: boolean) {
        return await this.request("decoderawtransaction", [hexstring, iswitness]);
    }

    /**
     * Decode a hex-encoded script.
     * https://developer.bitcoin.org/reference/rpc/decodescript.html
     */
    async decodescript(hexstring: string) {
        return await this.request("decodescript", [hexstring]);
    }

    /**
     * Finalize the inputs of a PSBT. If the transaction is fully signed, it will produce a
     * network serialized transaction which can be broadcast with sendrawtransaction. Otherwise a PSBT will be
     * created which has the final_scriptSig and final_scriptWitness fields filled for inputs that are complete.
     * https://developer.bitcoin.org/reference/rpc/finalizepsbt.html
     */
    async finalizepsbt(psbt: string, extract?: boolean) {
        return await this.request("finalizepsbt", [psbt, extract]);
    }

    /**
     * If the transaction has no inputs, they will be automatically selected to meet its out value.
     * https://developer.bitcoin.org/reference/rpc/fundrawtransaction.html
     */
    async fundrawtransaction(hexstring: string, options?: {add_inputs?: boolean, changeAddress?: string, changePosition?: number, change_type?: string, includeWatching?: boolean, lockUnspents?: boolean, fee_rate?: number | string, feeRate?: number | string, subtractFeeFromOutputs?: Array<number>}, iswitness?: boolean) {
        return await this.request("fundrawtransaction", [hexstring, options, iswitness]);
    }

    /**
     * Return the raw transaction data.
     * https://developer.bitcoin.org/reference/rpc/getrawtransaction.html
     */
    async getrawtransaction(txid: string, verbose?: boolean, blockhash?: string) {
        return await this.request("getrawtransaction", [txid, verbose, blockhash]);
    }

    /**
     * Joins multiple distinct PSBTs with different inputs and outputs into one PSBT with inputs and outputs from all of the PSBTs
     * No input in any of the PSBTs can be in more than one of the PSBTs.
     * https://developer.bitcoin.org/reference/rpc/joinpsbts.html
     */
    async joinpsbts(psbts: Array<string>) {
        return await this.request("joinpsbts", [psbts]);
    }

    /**
     * Submit a raw transaction (serialized, hex-encoded) to local node and network.
     * https://developer.bitcoin.org/reference/rpc/sendrawtransaction.html
     */
    async sendrawtransaction(hexstring: string, maxfeerate?: number | string) {
        return await this.request("sendrawtransaction", [hexstring, maxfeerate]);
    }

    /**
     * Sign inputs for raw transaction (serialized, hex-encoded).
     * https://developer.bitcoin.org/reference/rpc/signrawtransactionwithkey.html
     */
    async signrawtransactionwithkey(hexstring: string, privkeys: Array<string>, prevtxs?: Array<{txid: string, vout: number, scriptPubKey: string, redeemScript: string, witnessScript: string, amount?: number}>, sighashtype?: string) {
        return await this.request("signrawtransactionwithkey", [hexstring, privkeys, prevtxs, sighashtype]);
    }

    /**
     * Returns result of mempool acceptance tests indicating if raw transaction (serialized, hex-encoded) would be accepted by mempool.
     * https://developer.bitcoin.org/reference/rpc/testmempoolaccept.html
     */
    async testmempoolaccept(rawtxs: Array<string>, maxfeerate?: number | string) {
        return await this.request("testmempoolaccept", [rawtxs, maxfeerate]);
    }

    /**
     * Updates all segwit inputs and outputs in a PSBT with data from output descriptors, the UTXO set or the mempool.
     * https://developer.bitcoin.org/reference/rpc/utxoupdatepsbt.html
     */
    async utxoupdatepsbt(psbt: string, descriptors?: Array<string | {desc: string, range?: number | Array<number>}>) {
        return await this.request("utxoupdatepsbt", [psbt, descriptors]);
    }

    /**
     * Creates a multi-signature address with n signature of m keys required.
     * https://developer.bitcoin.org/reference/rpc/createmultisig.html
     */
    async createmultisig(nrequired: number, keys: Array<string>) {
        return await this.request("createmultisig", [nrequired, keys]);
    }

    /**
     * Derives one or more addresses corresponding to an output descriptor.
     * https://developer.bitcoin.org/reference/rpc/deriveaddresses.html
     */
    async deriveaddresses(descriptor: string, range?: number | Array<number>) {
        return await this.request("deriveaddresses", [descriptor, range]);
    }

    /**
     * Estimates the approximate fee per kilobyte needed for a transaction to begin
     * confirmation within conf_target blocks if possible and return the number of blocks
     * for which the estimate is valid. Uses virtual transaction size as defined
     * in BIP 141 (witness data is discounted).
     * https://developer.bitcoin.org/reference/rpc/estimatesmartfee.html
     */
    async estimatesmartfee(conf_target: number, estimate_mode?: string) {
        return await this.request("estimatesmartfee", [conf_target, estimate_mode]);
    }

    /**
     * Analyses a descriptor.
     * https://developer.bitcoin.org/reference/rpc/getdescriptorinfo.html
     */
    async getdescriptorinfo(descriptor: string) {
        return await this.request("getdescriptorinfo", [descriptor]);
    }

    /**
     * Returns the status of one or all available indices currently running in the node.
     * https://developer.bitcoin.org/reference/rpc/getindexinfo.html
     */
    async getindexinfo(index_name: number) {
        return await this.request("getindexinfo", [index_name]);
    }

    /**
     * Sign a message with the private key of an address
     * https://developer.bitcoin.org/reference/rpc/signmessagewithprivkey.html
     */
    async signmessagewithprivkey(privkey: string, message: string) {
        return await this.request("signmessagewithprivkey", [privkey, message]);
    }

    /**
     * Return information about the given bitcoin address.
     * https://developer.bitcoin.org/reference/rpc/validateaddress.html
     */
    async validateaddress(address: string) {
        return await this.request("validateaddress", [address]);
    }

    /**
     * Verify a signed message
     * https://developer.bitcoin.org/reference/rpc/verifymessage.html
     */
    async verifymessage(address: string, signature: string, message: string) {
        return await this.request("verifymessage", [address, signature, message]);
    }

    /**
     * Mark in-wallet transaction <txid> as abandoned
     * This will mark this transaction and all its in-wallet descendants as abandoned which will allow
     * for their inputs to be respent.  It can be used to replace “stuck” or evicted transactions.
     * https://developer.bitcoin.org/reference/rpc/abandontransaction.html
     */
    async abandontransaction(txid: string) {
        return await this.request("abandontransaction", [txid]);
    }

    /**
     * Stops current wallet rescan triggered by an RPC call, e.g. by an importprivkey call.
     * https://developer.bitcoin.org/reference/rpc/abortrescan.html
     */
    async abortrescan() {
        return await this.request("abortrescan", []);
    }

    /**
     * Add an nrequired-to-sign multisignature address to the wallet. Requires a new wallet backup.
     * https://developer.bitcoin.org/reference/rpc/addmultisigaddress.html
     */
    async addmultisigaddress(nrequired: number, keys: Array<string>, label?: string, address_type?: string) {
        return await this.request("addmultisigaddress", [nrequired, keys, label, address_type]);
    }

    /**
     * Safely copies current wallet file to destination, which can be a directory or a path with filename.
     * https://developer.bitcoin.org/reference/rpc/backupwallet.html
     */
    async backupwallet(destination: string) {
        return await this.request("backupwallet", [destination]);
    }

    /**
     * Bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction B.
     * https://developer.bitcoin.org/reference/rpc/bumpfee.html
     */
    async bumpfee(txid: string, options?: {conf_target?: number, fee_rate?: number | string, replaceable?: boolean, estimate_mode?: string}) {
        return await this.request("bumpfee", [txid, options]);
    }

    /**
     * Creates and loads a new wallet.
     * https://developer.bitcoin.org/reference/rpc/createwallet.html
     */
    async createwallet(wallet_name: string, disable_private_keys?: boolean, blank?: boolean, passphrase?: string, avoid_reuse?: boolean, descriptors?: boolean, load_on_startup?: boolean) {
        return await this.request("createwallet", [wallet_name, disable_private_keys, blank, passphrase, avoid_reuse, descriptors, load_on_startup]);
    }

    /**
     * Reveals the private key corresponding to ‘address’.
     * https://developer.bitcoin.org/reference/rpc/dumpprivkey.html
     */
    async dumpprivkey(address: string) {
        return await this.request("dumpprivkey", [address]);
    }

    /**
     * Dumps all wallet keys in a human-readable format to a server-side file. This does not allow overwriting existing files.
     * https://developer.bitcoin.org/reference/rpc/dumpwallet.html
     */
    async dumpwallet(filename: string) {
        return await this.request("dumpwallet", [filename]);
    }

    /**
     * Encrypts the wallet with ‘passphrase’. This is for first time encryption.
     * https://developer.bitcoin.org/reference/rpc/encryptwallet.html
     */
    async encryptwallet(passphrase: string) {
        return await this.request("encryptwallet", [passphrase]);
    }

    /**
     * https://developer.bitcoin.org/reference/rpc/getaddressbylabel.html
     */
    async getaddressbylabel(label: string) {
        return await this.request("getaddressbylabel", [label]);
    }

    /**
     * Return information about the given bitcoin address.
     * https://developer.bitcoin.org/reference/rpc/getaddressinfo.html
     */
    async getaddressinfo(address: string) {
        return await this.request("getaddressinfo", [address]);
    }

    /**
     * Returns the total available balance.
     * https://developer.bitcoin.org/reference/rpc/getbalance.html
     */
    async getbalance(dummy: string, minconf?: number, include_watchonly?: boolean, avoid_reuse?: boolean) {
        return await this.request("getbalance", [dummy, minconf, include_watchonly, avoid_reuse]);
    }

    /**
     * Returns an object with all balances in BTC.
     * https://developer.bitcoin.org/reference/rpc/getbalances.html
     */
    async getbalances() {
        return await this.request("getbalances", []);
    }

    /**
     * Returns a new Bitcoin address for receiving payments.
     * https://developer.bitcoin.org/reference/rpc/getnewaddress.html
     */
    async getnewaddress(label?: string, address_type?: string) {
        return await this.request("getnewaddress", [label, address_type]);
    }

    /**
     * Returns a new Bitcoin address, for receiving change.
     * https://developer.bitcoin.org/reference/rpc/getrawchangeaddress.html
     */
    async getrawchangeaddress(address_type?: string) {
        return await this.request("getrawchangeaddress", [address_type]);
    }

    /**
     * Returns the total amount received by the given address in transactions with at least minconf confirmations.
     * https://developer.bitcoin.org/reference/rpc/getreceivedbyaddress.html
     */
    async getreceivedbyaddress(address: string, minconf?: number) {
        return await this.request("getreceivedbyaddress", [address, minconf]);
    }

    /**
     * Returns the total amount received by addresses with <label> in transactions with at least [minconf] confirmations.
     * https://developer.bitcoin.org/reference/rpc/getreceivedbylabel.html
     */
    async getreceivedbylabel(label: string, minconf?: number) {
        return await this.request("getreceivedbylabel", [label, minconf]);
    }

    /**
     * Get detailed information about in-wallet transaction <txid>
     * https://developer.bitcoin.org/reference/rpc/gettransaction.html
     */
    async gettransaction(txid: string, include_watchonly?: boolean, verbose?: boolean) {
        return await this.request("gettransaction", [txid, include_watchonly, verbose]);
    }

    /**
     * DEPRECATED
     * Identical to getbalances().mine.untrusted_pending
     * https://developer.bitcoin.org/reference/rpc/getunconfirmedbalance.html
     */
    async getunconfirmedbalance() {
        return await this.request("getunconfirmedbalance", []);
    }

    /**
     * Returns an object containing various wallet state info.
     * https://developer.bitcoin.org/reference/rpc/getwalletinfo.html
     */
    async getwalletinfo() {
        return await this.request("getwalletinfo", []);
    }

    /**
     * Adds an address or script (in hex) that can be watched as if it were in your wallet but cannot be used to spend. Requires a new wallet backup.
     * https://developer.bitcoin.org/reference/rpc/importaddress.html
     */
    async importaddress(address: string, label?: string, rescan?: boolean, p2sh?: string) {
        return await this.request("importaddress", [address, label, rescan, p2sh]);
    }

    /**
     * Import descriptors. This will trigger a rescan of the blockchain based on the earliest timestamp of all descriptors being imported. Requires a new wallet backup.
     * https://developer.bitcoin.org/reference/rpc/importdescriptors.html
     */
    async importdescriptors(requests: Array<{desc: string, active?: boolean, range: number | Array<number>, next_index: number, timestamp: number | string, internal?: boolean, label?: string}>) {
        return await this.request("importdescriptors", [requests]);
    }

    /**
     * Import addresses/scripts (with private or public keys, redeem script (P2SH)), optionally rescanning the blockchain from the earliest creation time of the imported scripts. Requires a new wallet backup.
     * https://developer.bitcoin.org/reference/rpc/importmulti.html
     */
    async importmulti(requests: Array<{desc: string, scriptPubKey?: string | object, timestamp: number | string, redeemscript?: string, witnessscript?: string, pubkeys?: Array<string>, keys?: Array<string>}>, options?: {rescan: boolean}) {
        return await this.request("importmulti", [requests, options]);
    }

    /**
     * Adds a private key (as returned by dumpprivkey) to your wallet. Requires a new wallet backup.
     * https://developer.bitcoin.org/reference/rpc/importprivkey.html
     */
    async importprivkey(privkey: string, label?: string, rescan?: boolean) {
        return await this.request("importprivkey", [privkey, label, rescan]);
    }

    /**
     * Imports funds without rescan. Corresponding address or script must previously be included in wallet. Aimed towards pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported outputs or rescan after the point in the blockchain the transaction is included.
     * https://developer.bitcoin.org/reference/rpc/importprunedfunds.html
     */
    async importprunedfunds(rawtransaction: string, txoutproof: string) {
        return await this.request("importprunedfunds", [rawtransaction, txoutproof]);
    }

    /**
     * Adds a public key (in hex) that can be watched as if it were in your wallet but cannot be used to spend. Requires a new wallet backup.
     * https://developer.bitcoin.org/reference/rpc/importpubkey.html
     */
    async importpubkey(pubkey: string, label?: string, rescan?: boolean) {
        return await this.request("importpubkey", [pubkey, label, rescan]);
    }

    /**
     * Imports keys from a wallet dump file (see dumpwallet). Requires a new wallet backup to include imported keys.
     * https://developer.bitcoin.org/reference/rpc/importwallet.html
     */
    async importwallet(filename: string) {
        return await this.request("importwallet", [filename]);
    }

    /**
     * Fills the keypool.
     * https://developer.bitcoin.org/reference/rpc/keypoolrefill.html
     */
    async keypoolrefill(newsize?: number) {
        return await this.request("keypoolrefill", [newsize]);
    }

    /**
     * Lists groups of addresses which have had their common ownership
     * made public by common use as inputs or as the resulting change
     * in past transactions
     * https://developer.bitcoin.org/reference/rpc/listaddressgroupings.html
     */
    async listaddressgroupings() {
        return await this.request("listaddressgroupings", []);
    }

    /**
     * Returns the list of all labels, or labels that are assigned to addresses with a specific purpose.
     * https://developer.bitcoin.org/reference/rpc/listlabels.html
     */
    async listlabels(purpose?: string) {
        return await this.request("listlabels", [purpose]);
    }

    /**
     * Returns list of temporarily unspendable outputs.
     * https://developer.bitcoin.org/reference/rpc/listlockunspent.html
     */
    async listlockunspent() {
        return await this.request("listlockunspent", []);
    }

    /**
     * List balances by receiving address.
     * https://developer.bitcoin.org/reference/rpc/listreceivedbyaddress.html
     */
    async listreceivedbyaddress(minconf?: number, include_empty?: boolean, include_watchonly?: boolean, address_filter?: string) {
        return await this.request("listreceivedbyaddress", [minconf, include_empty, include_watchonly, address_filter]);
    }

    /**
     * List received transactions by label.
     * https://developer.bitcoin.org/reference/rpc/listreceivedbylabel.html
     */
    async listreceivedbylabel(minconf?: number, include_empty?: boolean, include_watchonly?: boolean) {
        return await this.request("listreceivedbylabel", [minconf, include_empty, include_watchonly]);
    }

    /**
     * Get all transactions in blocks since block [blockhash], or all transactions if omitted.
     * https://developer.bitcoin.org/reference/rpc/listsinceblock.html
     */
    async listsinceblock(blockhash?: string, target_confirmations?: number, include_watchonly?: boolean, include_removed?: boolean) {
        return await this.request("listsinceblock", [blockhash, target_confirmations, include_watchonly, include_removed]);
    }

    /**
     * If a label name is provided, this will return only incoming transactions paying to addresses with the specified label.
     * https://developer.bitcoin.org/reference/rpc/listtransactions.html
     */
    async listtransactions(label?: string, count?: number, skip?: number, include_watchonly?: boolean) {
        return await this.request("listtransactions", [label, count, skip, include_watchonly]);
    }

    /**
     * Returns array of unspent transaction outputs
     * with between minconf and maxconf (inclusive) confirmations.
     * https://developer.bitcoin.org/reference/rpc/listunspent.html
     */
    async listunspent(minconf?: number, maxconf?: number, addresses?: Array<string>, include_unsafe?: boolean, query_options?: object) {
        return await this.request("listunspent", [minconf, maxconf, addresses, include_unsafe, query_options]);
    }

    /**
     * Returns a list of wallets in the wallet directory.
     * https://developer.bitcoin.org/reference/rpc/listwalletdir.html
     */
    async listwalletdir() {
        return await this.request("listwalletdir", []);
    }

    /**
     * Returns a list of currently loaded wallets.
     * https://developer.bitcoin.org/reference/rpc/listwallets.html
     */
    async listwallets() {
        return await this.request("listwallets", []);
    }

    /**
     * Loads a wallet from a wallet file or directory.
     * https://developer.bitcoin.org/reference/rpc/loadwallet.html
     */
    async loadwallet(filename: string, load_on_startup?: boolean) {
        return await this.request("loadwallet", [filename, load_on_startup]);
    }

    /**
     * Updates list of temporarily unspendable outputs.
     * https://developer.bitcoin.org/reference/rpc/lockunspent.html
     */
    async lockunspent(unlock: boolean, transactions: Array<{txid: string, vout: number}>) {
        return await this.request("lockunspent", [unlock, transactions]);
    }

    /**
     * Bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction B.
     * https://developer.bitcoin.org/reference/rpc/psbtbumpfee.html
     */
    async psbtbumpfee(txid: string, options: {conf_target?: number, fee_rate?: number, replaceable?: boolean, estimate_mode?: string}) {
        return await this.request("psbtbumpfee", [txid, options]);
    }

    /**
     * Deletes the specified transaction from the wallet. Meant for use with pruned wallets and as a companion to importprunedfunds. This will affect wallet balances.
     * https://developer.bitcoin.org/reference/rpc/removeprunedfunds.html
     */
    async removeprunedfunds(txid: string) {
        return await this.request("removeprunedfunds", [txid]);
    }

    /**
     * Rescan the local blockchain for wallet related transactions.
     * https://developer.bitcoin.org/reference/rpc/rescanblockchain.html
     */
    async rescanblockchain(start_height?: number, stop_height?: number) {
        return await this.request("rescanblockchain", [start_height, stop_height]);
    }

    /**
     * EXPERIMENTAL warning: this call may be changed in future releases.
     * https://developer.bitcoin.org/reference/rpc/send.html
     */
    async send(outputs: Array<{[address: string]: string | number} | {data: string}>, conf_target?: number, estimate_mode?: string, fee_rate?: number, options?: {add_inputs?: boolean, add_to_wallet?: boolean, change_address?: string, change_position?: number, change_type?: string, subtract_fee_from_outputs?: Array<number>, conf_target?: number, estimate_mode?: string, fee_rate?: number | string, include_watching?: boolean, inputs?: Array<{txid: string, vout: number, sequence: number}>}) {
        return await this.request("send", [outputs, conf_target, estimate_mode, fee_rate, options]);
    }

    /**
     * Send multiple times. Amounts are double-precision floating point numbers.
     * https://developer.bitcoin.org/reference/rpc/sendmany.html
     */
    async sendmany(dummy: string, amounts: object, minconf?: number, comment?: string, subtractfeefrom?: Array<string>, replaceable?: boolean, conf_target?: number, estimate_mode?: string, fee_rate?: number) {
        return await this.request("sendmany", [dummy, amounts, minconf, comment, subtractfeefrom, replaceable, conf_target, estimate_mode, fee_rate]);
    }

    /**
     * Send an amount to a given address.
     * https://developer.bitcoin.org/reference/rpc/sendtoaddress.html
     */
    async sendtoaddress(address: string, amount: number | string, comment?: string, comment_to?: string, subtractfeefromamount?: boolean, replaceable?: boolean, conf_target?: number, estimate_mode?: string, avoid_reuse?: boolean) {
        return await this.request("sendtoaddress", [address, amount, comment, comment_to, subtractfeefromamount, replaceable, conf_target, estimate_mode, avoid_reuse]);
    }

    /**
     * Set or generate a new HD wallet seed. Non-HD wallets will not be upgraded to being a HD wallet. Wallets that are already
     * HD will have a new HD seed set so that new keys added to the keypool will be derived from this new seed.
     * https://developer.bitcoin.org/reference/rpc/sethdseed.html
     */
    async sethdseed(newkeypool?: string, seed?: string) {
        return await this.request("sethdseed", [newkeypool, seed]);
    }

    /**
     * Sets the label associated with the given address.
     * https://developer.bitcoin.org/reference/rpc/setlabel.html
     */
    async setlabel(address: string, label: string) {
        return await this.request("setlabel", [address, label]);
    }

    /**
     * Set the transaction fee per kB for this wallet. Overrides the global -paytxfee command line parameter.
     * https://developer.bitcoin.org/reference/rpc/settxfee.html
     */
    async settxfee(amount: number) {
        return await this.request("settxfee", [amount]);
    }

    /**
     * Change the state of the given wallet flag for a wallet.
     * https://developer.bitcoin.org/reference/rpc/setwalletflag.html
     */
    async setwalletflag(flag: string, value?: boolean) {
        return await this.request("setwalletflag", [flag, value]);
    }

    /**
     * Sign a message with the private key of an address
     * Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted.
     * https://developer.bitcoin.org/reference/rpc/signmessage.html
     */
    async signmessage(address: string, message: string) {
        return await this.request("signmessage", [address, message]);
    }

    /**
     * Sign inputs for raw transaction (serialized, hex-encoded).
     * https://developer.bitcoin.org/reference/rpc/signrawtransactionwithwallet.html
     */
    async signrawtransactionwithwallet(hexstring: string, prevtxs?: Array<{txid: string, vout: number, scriptPubKey: string, redeemScript?: string, witnessScript?: string, amount: number | string}>, sighashtype?: string) {
        return await this.request("signrawtransactionwithwallet", [hexstring, prevtxs, sighashtype]);
    }

    /**
     * Unloads the wallet referenced by the request endpoint otherwise unloads the wallet specified in the argument.
     * https://developer.bitcoin.org/reference/rpc/unloadwallet.html
     */
    async unloadwallet(wallet_name?: string, load_on_startup?: boolean) {
        return await this.request("unloadwallet", [wallet_name, load_on_startup]);
    }

    /**
     * Upgrade the wallet. Upgrades to the latest version if no version number is specified.
     * https://developer.bitcoin.org/reference/rpc/upgradewallet.html
     */
    async upgradewallet(version: number) {
        return await this.request("upgradewallet", [version]);
    }

    /**
     * Creates and funds a transaction in the Partially Signed Transaction format.
     * https://developer.bitcoin.org/reference/rpc/walletcreatefundedpsbt.html
     */
    async walletcreatefundedpsbt(inputs: Array<{txid: string, vout: number, sequence: number}>, outputs: Array<{address: string} | {data: string}>, locktime?: number, options?: object, bip32derivs?: boolean) {
        return await this.request("walletcreatefundedpsbt", [inputs, outputs, locktime, options, bip32derivs]);
    }

    /**
     * Removes the wallet encryption key from memory, locking the wallet.
     * https://developer.bitcoin.org/reference/rpc/walletlock.html
     */
    async walletlock() {
        return await this.request("walletlock", []);
    }

    /**
     * Stores the wallet decryption key in memory for ‘timeout’ seconds.
     * https://developer.bitcoin.org/reference/rpc/walletpassphrase.html
     */
    async walletpassphrase(passphrase: string, timeout: number) {
        return await this.request("walletpassphrase", [passphrase, timeout]);
    }

    /**
     * Changes the wallet passphrase from ‘oldpassphrase’ to ‘newpassphrase’.
     * https://developer.bitcoin.org/reference/rpc/walletpassphrasechange.html
     */
    async walletpassphrasechange(old_passphrase: string, new_passphrase: string) {
        return await this.request("walletpassphrasechange", [old_passphrase, new_passphrase]);
    }

    /**
     * Update a PSBT with input information from our wallet and then sign inputs
     * that we can sign for.
     * https://developer.bitcoin.org/reference/rpc/walletprocesspsbt.html
     */
    async walletprocesspsbt(psbt: string, sign?: boolean, sighashtype?: string, bip32derivs?: boolean) {
        return await this.request("walletprocesspsbt", [psbt, sign, sighashtype, bip32derivs]);
    }
}
