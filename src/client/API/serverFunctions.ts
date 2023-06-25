import { GASClient } from "gas-client";
import type * as server from "@/server/Main";
export const { serverFunctions } = new GASClient<typeof server>();
