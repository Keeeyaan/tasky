import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useStore } from "@/store";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { auth } = useStore();

  return auth?.accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
