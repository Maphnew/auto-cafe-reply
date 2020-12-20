const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
    const nid = process.env.NID;
    const npw = process.env.NPW;
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://nid.naver.com/nidlogin.login');
    await page.evaluate((id, pw) => {
        document.querySelector('#id').value = id;
        document.querySelector('#pw').value = pw;
    }, nid, npw);

    await page.click('.btn_global');
    await page.waitForNavigation();

    const targetPage = 'https://cafe.naver.com/ArticleList.nhn?search.clubid=29118241&search.boardtype=L'; 
    // await page.goto(targetPage);
    
    const targetPageTest = 'https://cafe.naver.com/ArticleList.nhn?search.clubid=30319791&search.boardtype=L';
    const targetPostTest = 'https://cafe.naver.com/campingkan/65158';
    await page.goto(targetPageTest);
    // Screenshot
    await page.screenshot({path: 'target.png', fullPage:true});
    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr td'))
        return tds.map(td => {
            console.log(td)
            td.innerText
        })
    })
    // const data = await page.$$eval('table tr td', tds => tds.map((td) => {
    //     return td.innerText;
    // }));

    console.log(data);
    console.log(data[0]);

    

    // const element = await page.$('');

    await browser.close();

})();