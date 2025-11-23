import fs from "fs"
import path from "path"

const extension = [".jpg",".jpeg",".png",".svg",".webp"]

// Search wich extension for the image in a given path, and return the name + .ext 
export function findImageExtension(pathName,imgName){
  for(var i = 0; i < extension.length; i++){
    const imgExtension = path.join(pathName,imgName + extension[i])
    if(fs.existsSync(imgExtension)){
      return imgName + extension[i]
    }
  }
  console.log("The path given was : ",path.join(pathName,imgName))
  throw new Error("The extension of the file you try to find cant be handle by our system.")
}