let ROLL_SIGN = "ROLL"

module.exports = {
    parse: (argsStr) => {
        let args = {"sign": ROLL_SIGN};
        let argsSplit = argsStr.split(" ");

        if(argsSplit.length < 2) return {"err": {"code": 1, "message": "arg too less"}, "args": arg};

        let a = Number(argsSplit[0]);
        let b = Number(argsSplit[1]);
        if(isNaN(a)) return {"err": {"code": 3, "message": "arg is not num"}, "args": args};
        if(isNaN(b)) return {"err": {"code": 3, "message": "arg is not num"}, "args": args};

        if(a > b)  a ^= b, b ^= a, a ^= b;

        args = Object.assign(args, {"a": a}, {"b": b});

        return  {"err": {"code": 0, "message": "sucess"}, "args": args};
    },
    run: (args) => {
        let result = 0;
        if(args.sign != ROLL_SIGN) return {"err": {"code": 1, "message": "sign is not match"}, "result": result};

        result = ~~(Math.random() * (b - a) + a);

        return  {"err": {"code": 0, "message": "sucess"}, "result": result};
    }
}