let PREFIX = '/';
let cmd = {
    "ROLL": require('./cmd/roll.js'),
    "NEENERGY": require('./cmd/neEnergy.js')
};
let cmdMapping = {
    "負能量": "NEENERGY"
}

module.exports = {
    parse: (message) => {
        let replyMessage = ""
        if(message.indexOf(PREFIX) != 0) return {"err": {"code": 1, "message": "prefix error"}, "replyMessage": null};
        
        let commandLine = message.substring(message.indexOf(PREFIX) + 1, message.length);
        if(!commandLine && commandLine != 0) return {"err": {"code": 2, "message": "command is empty"}, "replyMessage": null};
        
        let commandLength = commandLine.indexOf(" ");
        if(commandLength == -1) commandLength = commandLine.length;

        let command = commandLine.substring(0, commandLength).toUpperCase();
        if(command in cmdMapping) command = cmdMapping[command];
        if(!(command in cmd)) return {"err": {"code": 3, "message": "no this command"}, "replyMessage": null};

        let argsLine = commandLine.substring(commandLength + 1, commandLine.length);

        let err, args, result;
        ({err, args} = cmd[command].parse(argsLine));
        if(err.code) return {"err": err, "replyMessage": null};
        ({err, result} = cmd[command].run(args));
        if(err.code) return {"err": err, "replyMessage": null};

        return {"err": err, "replyMessage": result}
    }
}