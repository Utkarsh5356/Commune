import Router from "express";
import { db } from "../lib/prismaclient.js";
export const profile = Router();
profile.post("/create", async (req, res) => {
    try {
        const data = req.body;
        if (!data)
            res.status(401).json({ err: "you're not authorized" });
        const user = await db.profile.create({
            data: {
                userId: data.id,
                name: data.name,
                imageUrl: data.imageUrl,
                email: data.email
            }
        });
        if (!user)
            return res.status(403).json({ err: "invalid inputs" });
        res.json({ user });
    }
    catch (err) {
        return res.status(400).json({ err });
    }
});
profile.get("/data", async (req, res) => {
    const userId = req.query.userId;
    try {
        const user = await db.profile.findUnique({
            where: {
                userId: userId
            }
        });
        if (!user)
            return res.status(403).json({ err: "invalid input" });
        res.json({ user });
    }
    catch (err) {
        return res.status(400).json({ err });
    }
});
//# sourceMappingURL=profile.js.map