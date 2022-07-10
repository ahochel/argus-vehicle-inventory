export const formatLocaleDateTime = (ISODateTime: string) =>
  new Date(ISODateTime).toLocaleString();
