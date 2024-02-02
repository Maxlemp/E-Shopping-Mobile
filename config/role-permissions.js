const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const InRole =
  (...roles) =>
  (req, res, next) => {
    const role = roles.find((role) => req.user.role.indexOf(role) != -1);
    if (!role) {
      return res.status(401).json({ message: "Role Not Authorized" });
    }
    next();
  };

module.exports = {
  InRole,
  ROLES,
};
