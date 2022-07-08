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

    async getbestblockhash(): Promise<getbestblockhashResult> {
        return await this.request("getbestblockhash", []);
    }

    async getblock(blockhash: string, verbosity?: number): Promise<getblockResult> {
        return await this.request("getblock", [blockhash, verbosity]);
    }

    async getblockchaininfo(): Promise<getblockchaininfoResult> {
        return await this.request("getblockchaininfo", []);
    }

    async getblockcount(): Promise<getblockcountResult> {
        return await this.request("getblockcount", []);
    }

    async getblockfilter(blockhash: string, filtertype: string): Promise<getblockfilterResult> {
        return await this.request("getblockfilter", [blockhash, filtertype]);
    }

    async getblockhash(height: number): Promise<getblockhashResult> {
        return await this.request("getblockhash", [height]);
    }

    async getblockheader(blockhash: string, verbose?: boolean): Promise<getblockheaderResult> {
        return await this.request("getblockheader", [blockhash, verbose]);
    }

    async getblockstats(hash_or_height: number | string, stats?: Array<{height: string, time: string}>): Promise<getblockstatsResult> {
        return await this.request("getblockstats", [hash_or_height, stats]);
    }

    async getchaintips(): Promise<getchaintipsResult> {
        return await this.request("getchaintips", []);
    }

    async getchaintxstats(nblocks: number, blockhash?: string): Promise<getchaintxstatsResult> {
        return await this.request("getchaintxstats", [nblocks, blockhash]);
    }

    async getdifficulty(): Promise<getdifficultyResult> {
        return await this.request("getdifficulty", []);
    }

    async getmempoolancestors(txid: string, verbose?: boolean): Promise<getmempoolancestorsResult> {
        return await this.request("getmempoolancestors", [txid, verbose]);
    }

    async getmempooldescendants(txid: string, verbose?: boolean): Promise<getmempooldescendantsResult> {
        return await this.request("getmempooldescendants", [txid, verbose]);
    }

    async getmempoolentry(txid: string): Promise<getmempoolentryResult> {
        return await this.request("getmempoolentry", [txid]);
    }

    async getmempoolinfo(): Promise<getmempoolinfoResult> {
        return await this.request("getmempoolinfo", []);
    }

    async getrawmempool(verbose?: boolean, mempool_sequence?: boolean): Promise<getrawmempoolResult> {
        return await this.request("getrawmempool", [verbose, mempool_sequence]);
    }

    async gettxout(txid: string, n: number, includemempool?: boolean): Promise<gettxoutResult> {
        return await this.request("gettxout", [txid, n, includemempool]);
    }

    async gettxoutproof(txids: Array<string>, blockhash?: string): Promise<gettxoutproofResult> {
        return await this.request("gettxoutproof", [txids, blockhash]);
    }

    async gettxoutsetinfo(hash_type?: string): Promise<gettxoutsetinfoResult> {
        return await this.request("gettxoutsetinfo", [hash_type]);
    }

    async preciousblock(blockhash: string): Promise<preciousblockResult> {
        return await this.request("preciousblock", [blockhash]);
    }

    async pruneblockchain(height: number): Promise<pruneblockchainResult> {
        return await this.request("pruneblockchain", [height]);
    }

    async savemempool(): Promise<savemempoolResult> {
        return await this.request("savemempool", []);
    }

    async scantxoutset(action: string, scanobjects?: Array<string | {desc: string, range: number | Array<number>}>): Promise<scantxoutsetResult> {
        return await this.request("scantxoutset", [action, scanobjects]);
    }

    async verifychain(checklevel: number, nblocks?: number): Promise<verifychainResult> {
        return await this.request("verifychain", [checklevel, nblocks]);
    }

    async verifytxoutproof(proof: string): Promise<verifytxoutproofResult> {
        return await this.request("verifytxoutproof", [proof]);
    }

    async getmemoryinfo(mode?: string): Promise<getmemoryinfoResult> {
        return await this.request("getmemoryinfo", [mode]);
    }

    async getrpcinfo(): Promise<getrpcinfoResult> {
        return await this.request("getrpcinfo", []);
    }

    async help(command?: string): Promise<helpResult> {
        return await this.request("help", [command]);
    }

    async logging(include?: Array<string>, exclude?: Array<string>): Promise<loggingResult> {
        return await this.request("logging", [include, exclude]);
    }

    async stop(): Promise<stopResult> {
        return await this.request("stop", []);
    }

    async uptime(): Promise<uptimeResult> {
        return await this.request("uptime", []);
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
