import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export async function getCreateCommentInstruction(
  postAddress: PublicKey,
  text: string,
  wallet: any,
  solcialProgram: any
) {
  try {
    if (wallet.publickey) {
      const [userPda] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode("user"), wallet.publicKey.toBuffer()],
        solcialProgram.programId
      );
      const accounts = {
        systemProgram: anchor.web3.SystemProgram.programId,
      };
      const tx = await solcialProgram.methods
        .createComment(postAddress, text)
        .accounts(accounts)
        .instruction();
      return tx;
    } else {
      throw new Error("Wallet not connected");
    }
  } catch (e) {
    console.log("createUser error:", e);
  }
}
