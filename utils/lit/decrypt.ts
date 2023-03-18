import LitJsSdk from "@lit-protocol/sdk-browser";
import JSZip from "jszip";

import { LitArgs } from "./metadata";

import { NETWORK, solRpcConditions } from "./utils";

export async function decrypt(
  url,
  { encryptedSymmetricKey, solRpcConditions }
) {
  const client = new LitJsSdk.LitNodeClient({ debug: true });
  await client.connect();
  //@ts-ignore
  window.litNodeClient = client;

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: NETWORK });

  console.log("Log ~ file: decrypt.ts:12 ~ encryptedSymmetricKey:", encryptedSymmetricKey)
  const symmetricKey = await client.getEncryptionKey({
    solRpcConditions,
    toDecrypt: encryptedSymmetricKey,
    chain: NETWORK,
    authSig,
  });

  const encryptedZip = await fetch(url).then((response) =>
    response.blob()
  );

  const decrypted = await LitJsSdk.decryptZip(
    encryptedZip,
    symmetricKey
  );

  return decrypted;
}
