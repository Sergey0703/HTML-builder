const path=require('path');
const fs = require("fs");

fs.readdir(path.join(__dirname,'/secret-folder'), 
    { withFileTypes: true },
    (err, files) => {
    console.log("\nCurrent directory files:");
    if (err)
      console.log(err);
    else {
        for (let file of files) {
            if(file.isDirectory()!==true){
            getFiles(file);
         }
    }
    }
})

async function getFiles(file){
      let pathName=path.join(__dirname,`/secret-folder/${file.name}`);
      let size=0;
      size= await fs.promises.stat(pathName).then(stat => {
         return stat.size;
      });

      console.log(file.name ,' extn:',path.extname(file.name), ' size: ',size);

    }   

 