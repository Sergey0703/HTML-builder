const fs=require('fs');
//const copyFile =require('fs/promises');
const path=require('path');


fs.mkdir(path.join(__dirname,'files-copy'),{ recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created!!!');
  });

  fs.readdir(path.join(__dirname,'/files'), 
    { withFileTypes: true },
    (err, files) => {
    console.log("\nCurrent directory files:");
    console.log(files);
    if (err)
      console.log(err);
    else {
        for (let file of files) {
            if(file.isDirectory()!==true){
                copyFiles(file);
             }
    }
    }
})

async function copyFiles(file){
    
        let pathName=path.join(__dirname,`/files/${file.name}`);
        let distPath=path.join(__dirname,`/files-copy/${file.name}`);
       
        fs.copyFile(pathName, distPath, (err) => {
        if (err) throw err;
        console.log(`${file.name} was copied to destination folder`);
      })
}