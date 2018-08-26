var fs = require('fs'); 
var path = require('path'); 

async function findFile (srcPath,destPath){
  fs.readdir(srcPath,(err,files)=>{
    if(err || files.length==0) return 0;
    files.forEach(file=>{
      checkDir( file,srcPath,destPath )
      })
      return 1;
  })
}
async function checkDir(file,srcPath,destPath){
  fs.stat( path.resolve(srcPath,file) , (err,status)=>{
    if(err) {return 0}
    else if(status.isDirectory() && file!='node_modules' ) {  return  createNewDir(path.resolve(destPath,file)).then( findFile( path.resolve(srcPath,file),path.resolve(destPath,file) ) )  }
    else if (file!='node_modules') { return copyFiles ( path.resolve(srcPath,file),path.resolve(destPath,file) ) }
  })
}
async function createNewDir(destPath,file){
  fs.mkdir(destPath,file,(err)=>{
    if(err) return 0
    return 1
  })
}
async function copyFiles(srcPath,destPath){
  fs.readFile(srcPath,(err,data)=>{
    if(!err){
      fs.writeFile(destPath,data,(err)=>{
        if(!err){
          console.log(err)
          return 
        }
      })
    }
  })
}

srcPath='C:\\My Projects\\Other Projects\\node-fs-test\\Source'
destPath='C:\\My Projects\\Other Projects\\node-fs-test\\Destination'
findFile(srcPath,destPath)