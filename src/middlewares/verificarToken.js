import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "open system";

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ mensaje: "Token mal formado. Debe ser: Bearer <token>" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ mensaje: "Token expirado. Inicia sesión nuevamente." });
    }
    return res.status(403).json({ mensaje: "Token inválido." });
  }
}
