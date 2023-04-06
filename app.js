import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const PORT = process.env.PORT || 8080;
const app = express();

if(process.env.NODE_ENV == 'development') {
    console.log('development mode')
} else {
    console.log('production mode')
}

console.log('start');

function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        try{
            const data = fs.readFileSync(filePath);
            resolve(data.toString())
        } catch (error){
            reject(error)
        }
    })
}
readFilePromise(path.join(__dirname, './package.json'))
    .then(data => {
        const jsonContent = JSON.parse(data); 
        const formattedJson = JSON.stringify(jsonContent, null, 2);
        app.get('/', (req, res) => {
            res.send(`
                <h1>Welcome</h1>
                <h2>Json text: </h2>
                <pre>${formattedJson}</pre> 
            `)
        });
    })
    .catch(err => {console.error(err)})

app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
})