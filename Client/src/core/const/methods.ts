export enum AvailableMethods {
  GET = 1,
  POST,
  PUT,
  DELETE
}

export const AvailableMethodsArray = Object.values(AvailableMethods).filter(
  (k) => isNaN(Number(k)),
);
