const express = require('express');
const {WakaTime} = require("wakatime");
const app = express();


app.get('/', async function (req, res) {
    const wakaTimeInstance = new WakaTime(req.query.KEY);
    const myDate = new Date();
    myDate.setTime(myDate.getTime() - (24*60*60*1000) * 7);
    
    const data = (await wakaTimeInstance.summaries({
        start: myDate,
        end: new Date()
    })).data;
    
    const result = data.map((el, index) => {
        const daysAgo = data.length - (index + 1);
        return `${daysAgo === 0 ? 'Today: ' : daysAgo + ' days ago: '}${el.grand_total.text}`; 
    }).join('<br/>');
    res.send(result);
})

app.listen(3800);
