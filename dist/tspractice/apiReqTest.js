"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
(async () => {
    const apiReq = await playwright_1.request.newContext();
    const response = await apiReq.get('https://jsonplaceholder.typicode.com/posts');
    if (response.status() === 200) {
        console.log('API call is successfull, Status is is ', response.status());
    }
    else {
        console.error('ApI call failed, the status is: ', response.status());
    }
    const responseData = await response.json();
    console.log('Fetch posts: ', responseData.slice(0, 2));
    if (responseData.length > 0 && responseData[0].title) {
        console.log(' Test passed: Post fetched successfully with title: ', responseData[0].title);
    }
    else {
        console.error('Test failed: No posts or titles found in the response');
    }
    await apiReq.dispose();
})();
