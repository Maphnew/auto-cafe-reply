const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
    const nid = process.env.NID;
    const npw = process.env.NPW;
    const browser = await puppeteer.launch({headless: false, defaultViewport: {
        width: 500,
        height: 600
    }});
    const page = await browser.newPage();
    // await page.setViewport({width: 900, height: 600, deviceScaleFactor: 1});
    await page.goto('https://nid.naver.com/nidlogin.login');
    await page.evaluate((id, pw) => {
        document.querySelector('#id').value = id;
        document.querySelector('#pw').value = pw;
    }, nid, npw);

    await page.click('.btn_global');
    await page.waitForNavigation();

    const targetPage = 'https://m.cafe.naver.com/CafeMemberProfile.nhn?cafeId=29118241&memberId=khan2831'; 
    // await page.goto(targetPage);
    
    const targetPageTest = 'https://m.cafe.naver.com/CafeMemberProfile.nhn?cafeId=30319791&memberId=jinssakura';

    let i = 0;
    let newPost;
    try {
        await page.goto(targetPageTest);
        await page.waitForSelector(".list_area > li").then((list) => {
            return list[0]
        }).then(async (lastPost) => {
            while(i < 200) {
                await page.goto(targetPageTest);
                await page.waitForSelector(".list_area > li").then((list) => {
                    console.log(lastPost.innerHTML);
                    console.log(lastPost === list[0]);
                })
                console.log(i);
                i++;   
            };           
        });
        
    } catch (e) {
        console.log(e)
    };

        
    await page.$$(".list_area > li").then((list) => {
        return list[0]
    }).then(async(li) => {
        await li.click();
        await page.screenshot({path: 'screenshot.png'});
    });
    // console.log('els:', els.length);
    // els.map(async (el) => {
    //     const a = await page.evaluate((el) => {
    //         return el.innerHTML;
    //     }, el);
    //     return a;
    // }).then((allEls) => {
    //     console.log('allEls:', allEls)
    // })
    

    // await browser.close();

})();