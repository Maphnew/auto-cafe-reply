const puppeteer = require('puppeteer');
require('dotenv').config();

const loginAndGoToPage = async () => {
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

    await page.goto(targetPageTest);
    return {page, targetPageTest, browser}
};

module.exports = loginAndGoToPage;