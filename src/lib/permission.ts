import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  category: ["create", "read", "update", "delete"],
  event: ["create", "read", "update", "delete", "enroll"],
} as const;

const accessControl = createAccessControl(statement);

const admin = accessControl.newRole({
  category: ["create", "read", "update", "delete"],
  event: ["create", "read", "update", "delete", "enroll"],
  ...adminAc.statements,
});

const user = accessControl.newRole({
  event: ["read"],
});

export { accessControl, admin, user };
