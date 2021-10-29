const path= require('path');
const fs=require('fs');
const readline=require('readline');
const process=require('process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter your text: >'
  });
rl.prompt();
rl.on('line', (answer) => {
  wrToFile(answer);
  //rl.close();
});

  function wrToFile(mess){
   // fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {})
   if(mess==='exit') process.exit(0);
  fs.appendFile(path.join(__dirname,'text.txt'), mess, function(error){
    if(error) throw error; 
  });
}
process.on('beforeExit',() => {
    //await something()
    console.log('Good bye!');
    process.exit(0); 
});
process.on('exit',() => {
    console.log('Good bye!!!');
    process.exit(0); 
});

  