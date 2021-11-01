const fsp=require('fs').promises;
const fs=require('fs');
const path=require('path');
let arrCss= [];
let data = [];

async function main(){
    try{
    let files = await fsp.readdir(path.join(__dirname,'/styles'),{ withFileTypes: true });
    for(let file of files){
        if(path.extname(file.name)==='.css'){
        //console.log('file=',file.name);
        data.push(file.name);
        }
    }
   }catch(err){
      console.log(err);
   }
   // console.log(data);
  for await(const file of data) {
    arrCss.push(await readF(file));
  }

  fs.appendFile(path.join(__dirname,'/project-dist/bundle.css'), arrCss.join(''), function(error){
    if(error) throw error; 
  });
}
     
main();

async function readF(file){
     let stream = fs.ReadStream(path.join(__dirname, `/styles/${file}`));
    const chunks = [];
    for await (const chunk of stream) {
    chunks.push(chunk);
    //console.log('readF',chunk.toString()); 
    return chunk.toString(); 
    }
    /*await new Promise((resolve, reject)=>{
      stream.on('data',(chunk)=>{
      //  let data =  chunk.read();
      //  if(data){
            console.log('readF',chunk.toString()); 
       // }
      });
    });*/
}

