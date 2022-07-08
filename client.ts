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
}

// const client = new BitcoinRPC({
//   host: "localhost",
//   port: 18332,
//   user: "user",
//   pass: "pass",
// });
