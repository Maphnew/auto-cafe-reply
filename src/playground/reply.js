const loginAndGoToPage = require('../utils/login');

const reply = async({page, targetPageTest, browser}) => {
    try {
        await page.goto(targetPageTest);
        await page.waitForSelector(".list_area > li > a");
        await page.$$(".list_area > li").then(async(newPost) => {
            await newPost[0].click();
        });
        await page.waitForSelector(".top_area > h3 > a");
        const writeButton = await page.$$(".top_area > h3 > a").then((writeButton) => {
            // console.log('writeButton:', writeButton[0])
            return writeButton
        });
        await writeButton[0].click();
        await page.waitForSelector(".CommentWriteArea__inbox > textarea");
        
        await page.$$(".CommentWriteArea__inbox > textarea").then(async(textarea) => {
            // console.log('textarea:', textarea[0])
            await textarea[0].click();
            await page.focus('.textarea');
            await page.keyboard.type('1');

            // await page.$eval(".CommentWriteArea__inbox > textarea", el => el.value = 'test! test!!!!!');
            const register = await page.$$(".CommentWriteUpload__btn_register");
            await register[0].click();
        });
        
        
        // await browser.close();
     
    } catch (e) {
        console.log(e)
    };
};


(async () => {
    await loginAndGoToPage().then(async({page, targetPageTest, browser}) => {
        await reply({page, targetPageTest, browser});
    });
})();