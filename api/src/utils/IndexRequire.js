const fs = require('fs');
const path = require('path');
const UrlShorten = require('../routes/UrlShorten');

module.exports = (dirname, arg) => {
    const files = fs.readdirSync(dirname);
    files.forEach(file => {
        if (file !== 'index.js') {            
            const Dependency = require(path.join(dirname,file));
            if(Dependency instanceof UrlShorten){
                Dependency(arg);
            }
            new Dependency(arg);
        }
    });
}