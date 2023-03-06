import {
  Metaplex,
  PublicKey,
  toMetaplexFileFromBrowser,
} from "@metaplex-foundation/js";

import { SolcialPostMetadata } from "./types";

export const SOLCIAL_COLLECTION_ADDRESS = new PublicKey(
  "C5hiXYe8VxrM91Np3PHUCt5ifgXxYL6SgiZZDidcwAN5"
);

export async function createNft(
  nftMetadata: SolcialPostMetadata,
  metaplex: Metaplex
) {
  try {
    const { description, encryptedSymmetricKey, solRpcConditions, file } =
      nftMetadata;
    const { uri } = await metaplex.nfts().uploadMetadata({
      description,
      // symbol: 'SOLC',
      image: await toMetaplexFileFromBrowser(file),
      properties: {
        encryptedSymmetricKey,
        solRpcConditions,
      },
    });

    const creationResult = await metaplex.nfts()
    .create({
      name: "Unlock social",
      sellerFeeBasisPoints: 333,
      isCollection: false,
      // tokenStandard: TokenStandard.ProgrammableNonFungible,
      symbol: "SOLC",
      collection: SOLCIAL_COLLECTION_ADDRESS,
      uri,
    });
    return creationResult.nft.address.toString();
  } catch (e) {
    console.log("createNft error:", e);
  }
}
