import { AuthChecker } from "type-graphql";
// import { Context } from "./context"; // Your context type

import { Request, Response } from "express"; // You can use a different request/response type if you're using a different HTTP framework

export interface Context {
  req: Request; // Request object from Express or your chosen framework
  res: Response; // Response object from Express or your chosen framework
  currentUser: CurrentUser | null; // Current authenticated user, or null if not authenticated
  // Add other properties as needed
}

export interface CurrentUser {
  id: string;
  username: string;
  role: UserRole;
  // Add other user-related properties
}

export enum UserRole {
  ADMIN,
  USER,
}

export const customAuthChecker: AuthChecker<Context, UserRole> = (
  { context },
  roles
) => {
  const user = context.currentUser; // Get the user from the context

  if (!user) {
    return false; // User is not authenticated
  }

  if (roles.length === 0) {
    return true; // No specific role required, so anyone can access
  }

  return roles.includes(user.role); // Check if the user's role matches the required role
};
