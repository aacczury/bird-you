let PREFIX = '/';
let cmd = {};
cmd.ROLL = require('./cmdRoll.js');

module.exports = {
    parse: (message) => {
        let replyMessage = ""
        if(message.indexOf(PREFIX) != 0) return {"err": {"code": 1, "message": "prefix error"}, "replyMessage": replyMessage};
        
        let commandLine = message.substring(message.indexOf(PREFIX) + 1, message.length);
        if(!commandLine && commandLine != 0) return {"err": {"code": 2, "message": "command is empty"}, "replyMessage": replyMessage};
        
        let command = commandLine.substring(0, commandLine.indexOf(" ")).toUpperCase();
        if(!(command in cmd)) return {"err": {"code": 3, "message": "no this command"}, "replyMessage": replyMessage};

        let argsLine = commandLine.substring(commandLine.indexOf(" ") + 1, commandLine.length);

        let err, args, result;
        ({err, args} = cmd[command].parse(argsLine));
        if(err.code) return {"err": err, "replyMessage": replyMessage};
        ({err, result} = cmd[command].run(args));
        if(err.code) return {"err": err, "replyMessage": replyMessage};

        return {"err": err, "replyMessage": String(result)}
    }
}