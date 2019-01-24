#!/usr/bin/env node

const fs = require("fs")
const peer = require("./peer")

// console.log("=== ANZAR POSTINSTALL HOOK ===", process.cwd());
const f = fs.openSync("aaaaa-log.txt", "w+")
fs.writeSync(f, "postinstall:\n" + peer.getPeers(process.cwd()).map(x => x.name).join("\n"))
