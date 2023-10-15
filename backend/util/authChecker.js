"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAuthChecker = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["ADMIN"] = 0] = "ADMIN";
    UserRole[UserRole["USER"] = 1] = "USER";
})(UserRole || (exports.UserRole = UserRole = {}));
var customAuthChecker = function (_a, roles) {
    var context = _a.context;
    var user = context.currentUser; // Get the user from the context
    if (!user) {
        return false; // User is not authenticated
    }
    if (roles.length === 0) {
        return true; // No specific role required, so anyone can access
    }
    return roles.includes(user.role); // Check if the user's role matches the required role
};
exports.customAuthChecker = customAuthChecker;
