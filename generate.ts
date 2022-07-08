import { Project } from "https://deno.land/x/ts_morph@15.1.0/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.32-alpha/deno-dom-wasm.ts";

type Param = {
  name: string;
  type: string;
};

type Call = {
  name: string;
  params: Param[];
  result: object;
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

const project = new Project();

const originalClient = project.addSourceFileAtPath("./client.ts");
const clientCopy = originalClient.copy("mod.ts", { overwrite: true });

const output = project.addSourceFileAtPath(
  "./mod.ts",
);

// TODO: scrape docs for JSDoc comment

async function getDescription(name: string) {
  const url = `https://developer.bitcoin.org/reference/rpc/${name}.html`;
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

let descriptions = new Map<string, string>();

// TODO: remove response from methods
// TODO: add jsdoc

for (const [_, calls] of Object.entries(methods)) {
  for (const call of calls) {
    // const description = await getDescription(call.name);
    // descriptions.set(call.name, description);

    const descriptions = JSON.parse(
      Deno.readTextFileSync("./descriptions.json"),
    );
    const description = descriptions[call.name];

    // save descriptions to a file
    const client = clientCopy.getClass("BitcoinRPC");
    if (client === undefined) {
      throw new Error("BitcoinRPC class not found");
    }

    try {
      if (Object.keys(call.result).length === 0) {
        output.addTypeAlias({
          name: call.name + "Result",
          type: "void",
        });
      } else if (Object.keys(call.result).length === 1) {
        output.addTypeAlias({
          name: call.name + "Result",
          type: Object.values(call.result)[0],
        });
      } else {
        const returnDeclaration = output.addInterface({
          name: call.name + "Result",
        });

        for (const [key, value] of Object.entries(call.result)) {
          returnDeclaration.addProperty({
            name: key,
            type: value,
          });
        }
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
        description: description,
      });

      for (const param of call.params) {
        methodDeclaration.addParameter({
          name: param.name,
          type: param.type,
        });
      }

      // methodDeclaration.setReturnType(`Promise<${call.name}Result>`);
    } catch (e) {
      console.log(`${call.name} failed with ${e}`);
    }
  }
  await project.save();
}

// Deno.writeTextFileSync(
//   "./descriptions.json",
//   JSON.stringify(Object.fromEntries(descriptions)),
// );
