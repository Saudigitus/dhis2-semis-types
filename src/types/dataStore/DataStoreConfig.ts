import { z } from "zod";
import { staffDataStore } from "./staffSchema";
import { studentDataStore } from "./studentSchema";

export const dataStoreSchema = z.array(studentDataStore, staffDataStore);

export type selectedDataStoreKey = z.infer<typeof studentDataStore>
export type DataStoreProps = z.infer<typeof dataStoreSchema>
