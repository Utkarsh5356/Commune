import Router from "express"
import {channel} from "./channel.js"
import {server} from "./server.js"
import {profile} from "./profile.js"

export const mainrouter=Router()

mainrouter.use("/channel",channel)
mainrouter.use("/server",server)
mainrouter.use("/profile",profile)