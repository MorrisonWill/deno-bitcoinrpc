import { Project } from "https://deno.land/x/ts_morph@15.1.0/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.32-alpha/deno-dom-wasm.ts";

type Call = {
  name: string;
  params: [{
    name: string;
    type: string;
  }];
};

type Methods = {
  blockchain: Call[];
  control: Call[];
  generating: Call[];
  mining: Call[];
  network: Call[];
  rawtransactions: Call[];
  util: Call[];
  walletrpcs: Call[];
};

const methods: Methods = JSON.parse(Deno.readTextFileSync("methods.json"));

const docBase = "https://developer.bitcoin.org/reference/rpc/";

const project = new Project();

const originalClient = project.addSourceFileAtPath("./client.ts");
const clientCopy = originalClient.copy("mod.ts", { overwrite: true });

project.addSourceFileAtPath(
  "./mod.ts",
);

// TODO: scrape the arguments from the documentation for JSDoc
async function getDescription(name: string) {
  const url = `${docBase}${name}.html`;
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  if (doc === null) {
    throw new Error("Could not parse HTML");
  }
  const selection = doc.querySelector(`#${name} > p:nth-child(3)`);
  if (selection === null) {
    return "";
  }
  const description = selection.textContent;
  return description;
}

await getDescription("signmessage");

// map if descriptions.json is not present
// let descriptions = new Map<string, string>();

for (const [_, calls] of Object.entries(methods)) {
  for (const call of calls) {
    // getting descriptions
    // const description = await getDescription(call.name);
    // descriptions.set(call.name, description);

    const descriptions = JSON.parse(
      Deno.readTextFileSync("./descriptions.json"),
    );
    const description = descriptions[call.name];

    const client = clientCopy.getClass("BitcoinRPC");
    if (client === undefined) {
      throw new Error("BitcoinRPC class not found");
    }

    const methodDeclaration = client.addMethod({
      name: call.name,
    });

    methodDeclaration.setIsAsync(true);

    methodDeclaration.setBodyText((writer) => {
      writer.writeLine(
        `return await this.request("${call.name}", [${
          call.params.map((param) => `${param.name.replace("?", "")}`).join(
            ", ",
          )
        }]);`,
      );
    });

    methodDeclaration.addJsDoc({
      description: description + "\n" + `${docBase}${call.name}.html`,
    });

    for (const param of call.params) {
      methodDeclaration.addParameter({
        name: param.name,
        type: param.type,
      });
    }
  }
  await project.save();
}

// writing to descriptions file
// Deno.writeTextFileSync(
//   "./descriptions.json",
//   JSON.stringify(Object.fromEntries(descriptions)),
// );
