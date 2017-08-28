let fs = require("fs")
let NEENRGY_SIGN = "NEENERGY"
console.log("Loading NeEnergy.json...")
let neEnergyData = JSON.parse(fs.readFileSync("NeEnergy.json"))

module.exports = {
    parse: (argsStr) => {
        let args = {"sign": NEENRGY_SIGN};

        return  {"err": {"code": 0, "message": "sucess"}, "args": args};
    },
    run: (args) => {
        if(args.sign != NEENRGY_SIGN) return {"err": {"code": 1, "message": "sign is not match"}, "result": null};

        let n = parseInt(Math.random() * neEnergyData.length);
        if(!("url" in neEnergyData[n] && "thumb" in neEnergyData[n]))
            return  {"err": {"code": 2, "message": "query data fail"}, "result": null};

        return  {
            "err": {
                "code": 0,
                "message": "sucess"
            }, "result": {
                "type": "image",
                "originalContentUrl": neEnergyData[n].url,
                "previewImageUrl": neEnergyData[n].thumb
            }
        };
    }
}