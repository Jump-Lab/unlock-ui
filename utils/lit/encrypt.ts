import LitJsSdk from "@lit-protocol/sdk-browser";
import { LitArgs } from "./metadata";
import { NETWORK, solRpcConditions } from "./utils";

export async function encrypt(
  toEncryptFile: File,
  litArgs: LitArgs
): Promise<{ encryptedSymmetricKey: string; file: File }> {
  const client = new LitJsSdk.LitNodeClient({ debug: true });
  await client.connect();
  //@ts-ignore
  window.litNodeClient = client;
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: NETWORK });

  const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFile({
    file: toEncryptFile,
  });

  const encryptedSymmetricKey = await client.saveEncryptionKey({
    solRpcConditions: solRpcConditions(litArgs),
    chain: NETWORK,
    authSig: authSig,
    symmetricKey,
    permanent: 1,
  });

  const file = new File([encryptedFile], toEncryptFile.name);
  return {
    encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
      encryptedSymmetricKey,
      "base16"
    ),
    file,
  };
}
