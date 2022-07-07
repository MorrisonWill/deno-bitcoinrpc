// TODO: import is a bit odd, don't have types
import * as jsonRpc20 from "https://cdn.skypack.dev/json-rpc-2.0";

interface Args {
  host: string;
  port: number;
  user?: string;
  pass?: string;
}

export class Client {
  url: string;
  auth: boolean = false;
  user?: string;
  pass?: string;
  rpc: any;

  constructor({ host, port, user, pass }: Args) {
    this.url = `http://${host}:${port}`;
    if (user && pass) {
      this.auth = true;
      this.user = user;
      this.pass = pass;
    }
    this.rpc = new jsonRpc20.JSONRPCClient(async (jsonRPCRequest: any) => {
      // TODO: maybe this is not a good way to handle auth
      const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": this.auth
          ? `Basic ${btoa(`${this.user}:${this.pass}`)}`
          : "",
      });

      const response = await fetch(this.url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(jsonRPCRequest),
      });

      if (response.status === 200) {
        return this.rpc.receive(await response.json());
      }

      return Promise.reject(new Error(response.statusText));
    });
  }
}

interface getbestblockhashResult {
  hex: string;
}

async function getbestblockhash(): Promise<getbestblockhashResult> {
  const client = new Client({
    host: "localhost",
    port: 18332,
    user: "user",
    pass: "pass",
  });

  const response = await client.rpc.request("getblockchaininfo");
  return response;
}

const test = await getbestblockhash();
console.log(test);

// const client = new Client({
//   host: "localhost",
//   port: 18332,
//   user: "user",
//   pass: "pass",
// });
type getbestblockhashResult = string;

function getbestblockhash(): Promise<getbestblockhashResult> {
}

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

function getblock(
  blockhash: string,
  verbosity?: number,
): Promise<getblockResult> {
}
