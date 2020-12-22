const getTheTent = async({page, targetPage, browser}, reply) => {
    let i = 0;

    try {
        await page.goto(targetPage);
        await page.waitForSelector(".list_area > li > a");
        const preloadHref = await page.$eval('.list_area > li > a', el => el.href).then((preloadHref) => {
            // console.log(preloadHref)
            return preloadHref
        });
        
        while(true) {
            await page.goto(targetPage);
            await page.waitForSelector(".list_area > li > a");
            let newPost = await page.$$(".list_area > li").then((newPost) => {
                // console.log('newPost:', newPost[0])
                return newPost
            });
            const newHref = await page.$eval('.list_area > li > a', el => el.href).then((newHref) => {
                return newHref
            });
            

            if(preloadHref !== newHref) {
                await newPost[0].click();
                await page.waitForSelector(".top_area > h3 > a");
                const writeButton = await page.$$(".top_area > h3 > a");
                await writeButton[0].click();
                await page.waitForSelector(".CommentWriteArea__inbox > textarea");
                const textarea = await page.$$(".CommentWriteArea__inbox > textarea");
                await textarea[0].click();
                await page.focus('.textarea');
                await page.keyboard.type(reply);
                const register = await page.$$(".CommentWriteUpload__btn_register");
                await register[0].click();
                await page.screenshot({path: 'reply.png'});
                await browser.close();
                break;
            };

            console.log(i);
            i++;   
        };  
        return 
      
    } catch (e) {
        console.log(e)
    };

};

module.exports = getTheTent;

// (async () => {
//     await loginAndGoToPage().then(async(page) => {
//         await getTheTent(page);
//     });
// })();