const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testUpload(fieldName) {
    const form = new FormData();
    // Create a dummy file
    fs.writeFileSync('test.txt', 'hello world');
    form.append(fieldName, fs.createReadStream('test.txt'));

    try {
        const res = await axios.post('http://localhost:5000/api/upload', form, {
            headers: form.getHeaders(),
        });
        console.log(`✅ Success with field '${fieldName}':`, res.data);
    } catch (err) {
        if (err.response) {
            console.log(`❌ Failed with field '${fieldName}':`, err.response.data);
        } else {
            console.log(`❌ Failed with field '${fieldName}':`, err.message);
        }
    }
}

async function run() {
    console.log('Testing upload with "file"...');
    await testUpload('file');

    console.log('\nTesting upload with "image"...');
    await testUpload('image');
}

run();
