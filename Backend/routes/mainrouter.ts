import Router from "express"
import {channel} from "./channel"
import {server} from "./server"
import {profile} from "./profile"

export const mainrouter=Router()

mainrouter.use("/channel",channel)
mainrouter.use("/server",server)
mainrouter.use("/profile",profile)