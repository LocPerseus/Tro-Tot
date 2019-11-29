const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const config = require('./src/config/config');
// connect to db
mongoose
    .connect(config.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Database connected'))
    //Ép Mongoose sử dụng thư viện promise toàn cục
    // mongoose.Promise = global.Promise;
    //Lấy kết nối mặc định

app.listen(PORT, () => {
    console.log('Server started on http://localhost:' + PORT);
})