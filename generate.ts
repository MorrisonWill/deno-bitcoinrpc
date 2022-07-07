import { Project, Scope } from "https://deno.land/x/ts_morph@15.1.0/mod.ts";

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
  // TODO: add the other classes
};

const methods: Methods = JSON.parse(Deno.readTextFileSync("methods.json"));

const project = new Project();

const client = project.addSourceFileAtPath("./client.ts");
const clientCopy = client.copy("mod.ts", { overwrite: true });

// create source file with overwrite = true
const output = project.addSourceFileAtPath(
  "./mod.ts",
);

// TODO: finish copying client class over, adding functions to it, then write more JSON functions

for (const [RPCType, calls] of Object.entries(methods)) {
  for (const call of calls) {
    if (Object.keys(call.result).length === 1) {
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

    const functionDeclaration = output.addFunction({
      name: call.name,
    });

    for (const param of call.params) {
      functionDeclaration.addParameter({
        name: param.name,
        type: param.type,
      });
    }

    functionDeclaration.setReturnType(`Promise<${call.name}Result>`);

    // add functions to client class
  }
  await project.save();
}
