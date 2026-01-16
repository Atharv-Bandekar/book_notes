export const requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({
      error: "Unauthorized: admin access required",
    });
  }

  next();
};
