const fs=require('fs');
const fsp=require('fs').promises;
//const copyFile =require('fs/promises');
const path=require('path');
let allDir=[];
let allFiles=[];

async function main(){
   await makeDir('project-dist');
   console.log('project-dist');
   await makeDir('project-dist/assets');
   console.log('project-dist/assets');
   await readDirect(__dirname,'/assets','dir');

   console.log('allDir=',allDir);
   for (let dir of allDir){
     await makeDir(path.join('project-dist/assets',dir));
    // await copyFiles(path.join(__dirname,'/assets'),path.join('project-dist/assets',dir));
   }
   console.log('After makeDir, allFiles=',allFiles);

   for (let dir of allDir){
    await readDirect(path.join(__dirname,'/assets'),dir,'file');
   // await copyFiles(path.join(__dirname,'/assets'),path.join('project-dist/assets',dir));
  }
   console.log('after allDir');
   console.log('allFiles=',allFiles);
   for (let dir of allDir){
  //  await copyFiles(dir);
   for(let file of allFiles[dir]){
      await copyFiles(file, dir);
   }
   }


}
main();

async function readDirect(rootDir,dir,opt){
    try{
        let files = await fsp.readdir(path.join(rootDir,dir),{ withFileTypes: true });
        for(let file of files){
            if((file.isDirectory()===true)&&(opt==='dir')){
            //console.log('file=',file.name);
                console.log('dir=',path.join(dir, file.name));
                allDir.push(path.join(file.name));
                allFiles[file.name]=[];
               // allFiles.push(path.join(file.name));
               // await readDirect(path.join(dir, file.name));
            
            }else if((file.isDirectory()===false)&&(opt==='file')){
                console.log('dir=',dir, ' file=',path.join(rootDir, dir, file.name)); 
                allFiles[dir].push(file.name);
               // allFiles[dir].push(0);
               // allFiles{dir:};

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
    try { 
    await fs.promises.mkdir(path.join(__dirname,`${dist}`),{ recursive: true });
               console.log(`Directory created: ${dist} !!!`);
     }catch(err){
               console.log(err);
     }
       /* await fs.promises.mkdir(path.join(__dirname,`${dist}`),{ recursive: true }, (err) => {
           if (err) {
             return console.error(err);
           }
          // console.log(`Directory created: ${dist} !!!`);
         });
         */
        
}

async function copyFiles(file,dir){
    
       // let pathName=path.join(__dirname,`/assets/${file.name}`);
       // let distPath=path.join(__dirname,`/project-dist/assets/${file.name}`);
       try{
        await fs.promises.copyFile(path.join(__dirname,`/assets/${dir}`,file),path.join(__dirname,`/project-dist/assets/${dir}`,file)); //(err) => {
        //if (err) throw err;
        console.log(`${file} was copied `);
      }
       catch(err){
        console.log(err);
       }
}
