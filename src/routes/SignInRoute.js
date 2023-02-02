import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const base64Encoded = Buffer.from(username + ":" + password).toString(
    "base64"
  );

  res.send({ base64Encoded });
});

export { router as SignInRouter };
