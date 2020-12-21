const loginAndGoToPage = require('./utils/login');

const getTheTent = async({page, targetPageTest, browser}) => {
    let i = 0;

    try {
        await page.goto(targetPageTest);
        await page.waitForSelector(".list_area > li > a");
        let lastPost = await page.$$(".list_area > li").then((lastPost) => {
            // console.log('lastPost:', lastPost[0])
            return lastPost
        });
        const preloadHref = await page.$eval('.list_area > li > a', el => el.href).then((preloadHref) => {
            console.log(preloadHref)
            return preloadHref
        });
        
        while(i < 100) {
            await page.goto(targetPageTest);
            await page.waitForSelector(".list_area > li > a");
            let newPost = await page.$$(".list_area > li").then((newPost) => {
                // console.log('newPost:', newPost[0])
                return newPost
            });
            const newHref = await page.$eval('.list_area > li > a', el => el.href).then((newHref) => {
                console.log(newHref)
                return newHref
            });
            

            if(preloadHref !== newHref) {
                await newPost[0].click();
                await page.screenshot({ path: 'success.png' })
                await browser.close();
            };

            console.log(i);
            i++;   
        };   
      
    } catch (e) {
        console.log(e)
    };

        
    await page.$$(".list_area > li").then((list) => {
        return list[0]
    }).then(async(li) => {
        await li.click();
        await page.screenshot({path: 'screenshot.png'});
    });
};

(async () => {
    await loginAndGoToPage().then(async(page) => {
        await getTheTent(page);
    });
})();


// function timeout(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// async function sleep(fn, ...args) {
//     await timeout(500);
//     return fn(...args);
// }