import { atomWithStorage } from "jotai/utils";

export const eventAtom = atomWithStorage("currentEvent", []);
