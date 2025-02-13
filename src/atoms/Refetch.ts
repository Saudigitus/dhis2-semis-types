import { atom } from "recoil";

export const TableDataRefetch = atom<boolean>({
  key: "refetch-table-data",
  default: false,
});