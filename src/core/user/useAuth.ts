import { useMobXStore } from "@/core/store/useMobXStore";

export const useAuth = () => {
  const { user } = useMobXStore();
  return {
    isAuthenticated: user.isAuthorized,
    signIn: (username: string, password: string) =>
      user.signIn(username, password),
    signOut: () => user.signOut(),
  };
};
