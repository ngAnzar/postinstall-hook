const fs = require("fs")
const path = require("path")
const resolve = require("resolve")


const f = fs.openSync("aaaaa-log.txt", "w+")

function getPackageJson(package) {
    let packageJson = path.join(package, "package.json")
    if (!fs.existsSync(packageJson)) {
        let resolved = resolve(package)

        fs.writeSync(f, "getPackageJson: " + package + " = " + resolved)

        do {
            resolved = path.dirname(resolved)
            packageJson = path.join(resolved, "package.json")
        } while (!fs.existsSync(packageJson) && resolved);
    }

    return JSON.parse(fs.readFileSync(packageJson))
}


function getPeers(json) {
    if (json && json.peerDependencies) {
        return packagesAsList(json.peerDependencies)
    }
    return []
}


function packagesAsList(packages) {
    return Object.keys(packages)
        .map(key => {
            return {
                name: key,
                version: packages[key]
            }
        })
}


function getAllPeers(package) {

}


module.exports.getPeers = function (package) {
    const packageJson = getPackageJson(package)
    let peers = []

    if (packageJson && packageJson.dependencies) {
        packagesAsList(packageJson.dependencies).forEach(pkg => {
            peers = peers.concat(getPeers(getPackageJson(pkg.name)))
        })
    }

    return peers.concat(getPeers(packageJson))
}
