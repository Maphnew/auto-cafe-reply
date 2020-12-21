const loginAndGoToPage = require('../utils/login');

const href = async(info) => {
    const page = info.page;
    const targetPageTest = info.targetPageTest;
    try {
        await page.goto(targetPageTest);
        await page.waitForSelector(".list_area > li > a");
        const preloadHref = await page.$eval('.list_area > li > a', el => el.href).then((preloadHref) => {
            console.log(preloadHref)
            return preloadHref
        });


      
    } catch (e) {
        console.log(e)
    };
};


(async () => {
    await loginAndGoToPage().then(async(page) => {
        await href(page);
    });
})();