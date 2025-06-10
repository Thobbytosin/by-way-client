import { SERVER_URI } from "@/config/api";

export const isServerOnline = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${SERVER_URI}/ui-health`);
    return res.ok;
  } catch {
    return false;
  }
};
