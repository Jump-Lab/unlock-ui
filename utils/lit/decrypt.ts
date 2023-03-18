import LitJsSdk from "@lit-protocol/sdk-browser";

import { NETWORK } from "./utils";

export async function decrypt(
  url: string,
  { encryptedSymmetricKey, solRpcConditions }
) {
  const client = new LitJsSdk.LitNodeClient({ debug: true });
  await client.connect();
  //@ts-ignore
  window.litNodeClient = client;

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: NETWORK });

  const symmetricKey = await client.getEncryptionKey({
    solRpcConditions,
    toDecrypt: encryptedSymmetricKey,
    chain: NETWORK,
    authSig,
  });

  const encryptedFile = await fetch(url).then((response) => {
    return response.blob();
  });

  const decrypted = await LitJsSdk.decryptFile(encryptedFile, symmetricKey);

  return decrypted;
}
