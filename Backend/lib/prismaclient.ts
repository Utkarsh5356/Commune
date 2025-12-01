import dotenv from "dotenv"
dotenv.config()
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter=new PrismaPg({connectionString:process.env.DATABASE_URL})
export const db=new PrismaClient({adapter})
