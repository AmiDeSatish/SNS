import fs from "fs"
import path from "path"
import { products } from "./collection1/products"
import { capitalizeFirstLetter } from "../../src/utils/string.js"

const ORI_PATH = "/public/assets/products"

// Generate automaticaly 
// public/assets/type/brand/name
//  /color1
//  /color2
//  ...
//  /colorN
export function GenerateProductFiles(){
  products.forEach(product => {
    const sexe = capitalizeFirstLetter(product.sexe || "Unisex")
    const brand = capitalizeFirstLetter(product.brand)
    const name =  capitalizeFirstLetter(product.name)
    const type = capitalizeFirstLetter(product.type)

    const __finalPath = path.join(ORI_PATH,sexe,type,brand,name)

    product.colorsAvailable.forEach(color =>{
      const __finalPathColor = path.join(__finalPath,color)
      fs.mkdirSync(__finalPathColor,{recursive : true})
    })
  })
}

export function GenerateCatalogue(productId){
  
}