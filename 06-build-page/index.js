const fs=require('fs');
const fsp=require('fs').promises;
const path=require('path');
let allDir=[];
let allFiles=[];
let allFilesCss=[];
let allCss=[];

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
   await readDirect(__dirname,'/styles','css');
   for await(const file of allFilesCss) {
    allCss.push(await readF(path.join(__dirname, `/styles/${file}`)));
  }

  await fs.promises.appendFile(path.join(__dirname,'/project-dist/style.css'), allCss.join(''), function(error){
    if(error) throw error; 
  });
   console.log('made style.css');

   let templ =await readF(path.join(__dirname,'template.html'));
  // console.log(templ);
   let header =await readF(path.join(__dirname,'/components/header.html'));
   let articles =await readF(path.join(__dirname,'/components/articles.html'));
   let footer =await readF(path.join(__dirname,'/components/footer.html'));

   let result = templ.replace('{{header}}', `${header}`);
   result = result.replace('{{articles}}', `${articles}`);
   result = result.replace('{{footer}}', `${footer}`);

   //console.log('result=',result);

   await fs.promises.appendFile(path.join(__dirname,'/project-dist/index.html'), `${result}`, function(error){
    if(error) throw error; 
  });


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
            }else if((file.isDirectory()===false)&&(opt==='file')){
                console.log('dir=',dir, ' file=',path.join(rootDir, dir, file.name)); 
                allFiles[dir].push(file.name);
            }else if((file.isDirectory()===false)&&(opt==='css')){
                console.log('dir=',dir, ' file=',path.join(rootDir, dir, file.name)); 
                allFilesCss.push(file.name);
            }
        }
       }catch(err){
          console.log(err);
       }
}

async function makeDir(dist){
    try { 
    await fs.promises.mkdir(path.join(__dirname,`${dist}`),{ recursive: true });
               console.log(`Directory created: ${dist} !!!`);
     }catch(err){
               console.log(err);
     }
}

async function copyFiles(file,dir){
       // let pathName=path.join(__dirname,`/assets/${file.name}`);
       // let distPath=path.join(__dirname,`/project-dist/assets/${file.name}`);
       try{
        await fs.promises.copyFile(path.join(__dirname,`/assets/${dir}`,file),path.join(__dirname,`/project-dist/assets/${dir}`,file)); //(err) => {
        console.log(`${file} was copied `);
      }
       catch(err){
        console.log(err);
       }
}

async function readF(file){
   let stream = fs.ReadStream(file);
   const chunks = [];
   for await (const chunk of stream) {
   chunks.push(chunk);
   return chunk.toString().trim(); 
   }
}

