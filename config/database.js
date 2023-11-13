// config/database.js
module.exports = {
    'url': 'mongodb+srv://user:pass@cluster0.cy9xnyv.mongodb.net/loop_increments?retryWrites=true&w=majority',
    'dbName': 'loop_increments'
}
// Put this in gitignore, so others can't see db credentials
// When using own database in savage-auth projects, make sure to add name of db before '?' in 'url'