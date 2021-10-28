const path = require('path');
const  fs=require('fs');
//import { stdin, stdout } from 'process';

let stream =  fs.ReadStream(path.join(__dirname, 'text.txt'));

stream.on('readable', function() {
    stream.setEncoding('utf8');
    let data = stream.read();
    if (data){
      console.log(data.toString());
     } 
});
 
stream.on('error', function(err) {
    if (err.code == 'ENOENT') {
        console.log("File not Found");
    } else {
        console.error(err);
    }
});