import { Request, Response, NextFunction } from "express";
import { oktaJwtVerifier } from "./oktaJwtVerifier";

export const oktaAuthRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization || "";
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
      res.status(401);
      throw Error("Unauthorized");
    }

    const accessToken = match[1];
    const audience = "api://default";

    const jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, audience);
    // For simplicity we will give any type here for now, gonna update this later to be more specific.
    (req as any).jwt = jwt;
    next();
  } catch (err: any) {
    // console.error("Verification error:", err);
    res.status(401).send(err.message);
  }
};
