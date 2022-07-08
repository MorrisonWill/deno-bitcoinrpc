import BitcoinRPC from "./mod.ts";

const client = new BitcoinRPC({
  host: "localhost",
  port: 18332,
  user: "user",
  pass: "pass",
});

console.log(await client.uptime());
