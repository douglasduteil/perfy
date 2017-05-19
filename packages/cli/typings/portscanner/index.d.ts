
declare module "portscanner" {
   export function findAPortNotInUse (from: number, to: number): Promise<number>;
}
