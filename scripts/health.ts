const r=await fetch(`http://${process.env.HOST??'127.0.0.1'}:${process.env.PORT??8787}/health`); console.log(JSON.stringify(await r.json(),null,2));
