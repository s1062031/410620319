const LinebotSDK = require("@line/bot-sdk");

const koa = require("koa");
const koaBodyparser = require("koa-bodyparser");
const koaRouter = require("koa-router");

const channelSecret = process.env.channelSecret;
const channelAccessToken = process.env.channelAccessToken;

const lineAPI = new LinebotSDK.Client({
    "channelSecret":channelSecret,
    "channelAccessToken":channelAccessToken
});

const app = new koa();
const router = new koaRouter();

app.use(koaBodyparser());

router.post("/",function(abc){
    if(LinebotSDK.validateSignature(abc.request.body,channelSecret,abc.request.headers['x-line-signature'])){
        abc.status =200;
        abc.request.body.events.map(MessageHandler);
    }else{
        abc.status=401;
        abc.body="Authorize failed.";
    }
});

app.use(router.routes());

const server =app.listen(process.env.PORT || 8080);

async function MessageHandler(event){//async 非同步
    console.log(event);
}





