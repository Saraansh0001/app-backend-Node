const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing connection to:', process.env.MONGO_URI.split('@')[1]); // Log host only for privacy

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ Success!');
    process.exit(0);
})
.catch(err => {
    console.error('❌ Failed:', err);
    process.exit(1);
});
