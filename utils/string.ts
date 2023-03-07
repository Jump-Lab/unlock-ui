export function shortenString(address: string = "", chars = 16): string {
    return `${address.slice(0, chars)}...`;
  }