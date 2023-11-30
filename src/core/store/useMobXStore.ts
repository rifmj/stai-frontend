import { StoreContext } from "@/core/store/StoreContext";
import { useContext } from "react";

export const useMobXStore = () => useContext(StoreContext);
