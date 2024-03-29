import {
  Metaplex,
  PublicKey,
  toMetaplexFileFromBrowser,
} from "@metaplex-foundation/js";

import { SolcialPostMetadata } from "./types";

const solcialCollectionAddress = new PublicKey(
  process.env.NEXT_PUBLIC_SOLCIAL_COLLECTION_ADDRESS
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
      symbol: "SOLLC",
      collection: solcialCollectionAddress,
      uri,
    });
    return creationResult.nft.address.toString();
  } catch (e) {
    console.log("createNft error:", e);
  }
}
