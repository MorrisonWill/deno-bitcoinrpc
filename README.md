<h1 align="center">bitcoin_rpc</h1>
<p align="center">Bitcoin RPC Library for Deno</p>

## Usage

The latest version of bitcoin_rpc can be imported from https://deno.land/x/bitcoin_rpc/mod.ts.

You can also view the documentaton [here](https://doc.deno.land/https://deno.land/x/bitcoin_rpc/mod.ts).

## Example

```typescript
import BitcoinRPC from "https://deno.land/x/bitcoin_rpc/mod.ts";

const client = new BitcoinRPC({
  host: "localhost",
  port: 18332,
  username: "user",
  password: "pass",
});

console.log(await client.getblockchaininfo());
```
