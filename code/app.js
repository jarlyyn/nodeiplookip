var http=require('http');
var config=require(__dirname+'/config.json');
var server=new http.Server();
var verifyServerName=function(serverName)
{
	if (config.serverName==null){return true};
	if (typeof(config.serverName)=='string'){return serverName==config.serverName};
        if (typeof(config.serverName)=='object'){return config.serverName[serverName]};
}
server.on('request',function(req,res){
    if (!verifyServerName(req.headers.host)){
      res.writeHead(403);
      res.end();
      return;
    }
    res.writeHead(200,{'Content-Type':'text/json'});
    res.write(JSON.stringify({"ip":res.connection.remoteAddress}));
    res.end();
});
server.listen(config.port);
