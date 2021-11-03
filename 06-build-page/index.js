const fs=require('fs');
const fsp=require('fs').promises;
//const copyFile =require('fs/promises');
const path=require('path');
let allDir=[];

async function main(){
   await makeDir('project-dist');
   console.log('project-dist');
   await makeDir('project-dist/assets');
   console.log('project-dist/assets');
   await readDirect(path.join(__dirname,'/assets'));

   console.log('allDir=',allDir);
   for (let dir of allDir){
     await makeDir(path.join('project-dist/assets',dir));
   }
   console.log('after allDir');
}
main();

async function readDirect(dir){
    try{
        let files = await fsp.readdir(dir,{ withFileTypes: true });
        for(let file of files){
            if(file.isDirectory()===true){
            //console.log('file=',file.name);
                console.log('dir=',path.join(dir, file.name));
                allDir.push(path.join(file.name));
                await readDirect(path.join(dir, file.name));
            //data.push(file.name);
            }
        }
       }catch(err){
          console.log(err);
       }
      
  /*  await fs.promises.readdir(dir, 
    { withFileTypes: true },
    (err, files) => {
    console.log("\nCurrent directory files:");
    console.log(files);
    if (err)
      console.log(err);
    else {
        for (let file of files) {
            if(file.isDirectory()===true){
                console.log('dir=',path.join(dir, file.name));
                allDir.push(path.join(dir, file.name));
                readDirect(path.join(dir, file.name));
                return;
              //  await makeDir(file.name);
               // copyFiles(file);
             }
    }
    }
})
*/
}
async function makeDir(dist){
   // try {   
        await fs.promises.mkdir(path.join(__dirname,`${dist}`),{ recursive: true }, (err) => {
           if (err) {
             return console.error(err);
           }
          // console.log(`Directory created: ${dist} !!!`);
         });
        //     }catch(err){
        //       console.log(err);
        // }
}

async function copyFiles(file){
    
        let pathName=path.join(__dirname,`/assets/${file.name}`);
        let distPath=path.join(__dirname,`/project-dist/assets/${file.name}`);
       
        fs.copyFile(pathName, distPath, (err) => {
        if (err) throw err;
        console.log(`${file.name} was copied to destination folder`);
      })
}
