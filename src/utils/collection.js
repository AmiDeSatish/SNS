import fs from "fs"
import { normalizeString } from "./string"

const __collectionPath = "prisma/data"

function findCollectionNumber(string){
  return parseInt(string[-1])
}

export function SearchLastCollection(){
  const folders = fs.readdirSync(__collectionPath)
  let oldest = findCollectionNumber(folders[0])
  folders.forEach(folder => {
    if(findCollectionNumber(folder) > oldest){oldest = findCollectionNumber(folder)}
  })
  return "collection" + String(oldest);
}