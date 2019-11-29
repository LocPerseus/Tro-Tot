const AccessControl = require('accesscontrol');
const ac = new AccessControl();
// exports.roles = (() => {
//     ac.grant("user")
//         .readAny(['user', 'category', 'news'])
//         .createAny(['user', 'news'])
//         .deleteAny('news')
//         .updateAny('news')
//     ac.grant("admin")
//         .readAny('user', ['*', '!password'])
//         .updateAny("category")
//         .deleteAny(["category", "news"]);
//     // console.log(ac.getGrants());
//     return ac;

// })();
exports.roles = (() => {
    // grant: ban cho
    ac.grant("guest")
        .readOwn('profile')
        .updateOwn('profile');
    ac.grant("user")
        .extend('guest')

    ac.grant("admin")
        .extend("guest")
        .extend("user")
        .readAny("profile")
        .updateAny("profile")
        .deleteAny("profile");
    return ac;
})()