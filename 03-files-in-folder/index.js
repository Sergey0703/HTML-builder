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
      let fName=file.name.substr(0,file.name.lastIndexOf(path.extname(file.name)) );
      let fExt=file.name.substr(file.name.lastIndexOf(path.extname(file.name))+1 );
      console.log(fName ,'-',fExt, '-',getSize(size));

    }   

    function getSize( bytes ){
      if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' Gb';}
      else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' Mb';}
      else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' kb';}
      else if (bytes>1)           {bytes=bytes+' bytes';}
      else if (bytes==1)          {bytes=bytes+' byte';}
      else                        {bytes='0 byte';}
      return bytes;
}