const puppeteer = require('puppeteer');
require('dotenv').config();

const loginAndGoToPage = async (nid, npw, target) => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: {
        width: 500,
        height: 600
    }});
    const page = await browser.newPage();
    await page.goto('https://nid.naver.com/nidlogin.login');
    await page.evaluate((id, pw) => {
        document.querySelector('#id').value = id;
        document.querySelector('#pw').value = pw;
    }, nid, npw);
    await page.click('.btn_global');
    await page.waitForNavigation();
    const targetPage = target;
    await page.goto(targetPage);
    return {page, targetPage, browser}
};

module.exports = loginAndGoToPage;