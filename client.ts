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
}
