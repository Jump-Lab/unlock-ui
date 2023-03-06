import { ConnectedWallet } from "@saberhq/use-solana";
import * as anchor from "@project-serum/anchor";

import { UserData } from "types";
import { TransactionInstruction } from "@solana/web3.js";

export async function getCreateUserInstruction(
  userData: UserData,
  wallet: ConnectedWallet,
  solcialProgram: any
) {
  try {
    if (wallet.publicKey) {
      const preparedUserData = {
        ...userData,
        gender: new anchor.BN(userData.gender),
        dateOfBirth: new anchor.BN(userData.dateOfBirth),
      };
      const [userPda] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode("user"), wallet.publicKey.toBuffer()],
        solcialProgram.programId
      );
      const accounts = {
        user: userPda,
        signer: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      };
      const tx = (await solcialProgram.methods
        .createUser(preparedUserData)
        .accounts(accounts)
        .instruction()) as TransactionInstruction;
      return tx;
    } else {
      throw new Error("Wallet not connected");
    }
  } catch (e) {
    console.log("createUser error:", e);
  }
}

export async function getUpdateUserInstruction(
  userData: UserData,
  wallet: ConnectedWallet,
  //TODO: Update type for solcial program
  solcialProgram: any
) {
  try {
    if (wallet.publicKey) {
      const preparedUserData = {
        ...userData,
        gender: new anchor.BN(userData.gender),
        dateOfBirth: new anchor.BN(userData.dateOfBirth),
      };
      const [userPda] = await anchor.web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode("user"), wallet.publicKey.toBuffer()],
        solcialProgram.programId
      );
      const accounts = {
        user: userPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      };
      const tx = await solcialProgram.methods
        .updateUser(preparedUserData)
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
