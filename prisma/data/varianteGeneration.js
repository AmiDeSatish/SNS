import { products } from "./collection1/products.js";
import { capitalizeFirstLetter,normalizeString } from "../../src/utils/string.js"
import { findImageExtension } from "../../src/utils/image.js";
import "@prisma/client"
import path from "path"
import fs from "fs"

const __productsAssetsPath = "public/assets/products"
const __reservoirPath = "public/assets/products/reservoir"

export function GetSizeDefault(type, sexe){
  const Type = capitalizeFirstLetter(type)
  const Sexe = capitalizeFirstLetter(sexe)
  if(Type == "Sneakers"){
    if(Sexe == "Male"){
      return Array.from({length : 50 - 40 +1},(_,i) => String(40 + i))
    }
    else if (Sexe == "Unisex"){
      return Array.from({length : 48 - 36 + 1},(_,i) => String(36 + i))
    }
    else if(Sexe == "Female"){
      return Array.from({length : 42 -36 + 1}, (_,i) => String(36 + i))
    }
  }
  else if(Type == "Accessories" || Type == "Clothes"){
    return ["S","M","L","XL","2XL"]
  }
  else{
    console.log("Type received : ", Type)
    throw new TypeError("The type of clothes doesnt exist yet")
  }
}

export function GetStockDefault(){
  return 8
}

export function GetPriceDefault(type){
  const Type = capitalizeFirstLetter(type)
  if(Type == "Sneakers"){return 100}
  else if(Type == "Accessories"){return 30}
  else if(Type == "Clothes"){return 40}
  else{
    console.log("Type received : ", Type)
    throw new TypeError("The type of clothes doesnt exist yet")
  }
}

function GenerateFile(product,color){
  // Get the info of the product
  const sexe = normalizeString(product.sexe || "Unisex")
  const brand = normalizeString(product.brand)
  const name =  normalizeString(product.name)
  const type = normalizeString(product.type)

  const __finalPath = path.join(__productsAssetsPath,sexe,type,brand,name,normalizeString(color))

  fs.mkdirSync(__finalPath,{recursive : true})
  return __finalPath
}

export async function VarianteGeneration(CreatedProduct, prisma){
  console.log("VARIANT GENERATION")
  // 1 : Find the right product
  const product = products.find(p => p.name === CreatedProduct.name)
  if (!product) throw new Error("Product not found in products.js")

  // 2 : Creation of product's variants
  for(const[variantColor,variantData] of Object.entries(product.colorsAvailable)){
    // image name : Air Jordan 1
    const imageName = normalizeString(`${product.name}`+"@"+`${variantColor}`)
    // imageName => air_jordan_1@blue
    const imageExtension = findImageExtension(__reservoirPath,imageName)
    // image extension => air_jordan_1@blue.jpg
    const imageOldPath = path.join(__reservoirPath,imageExtension)
    // imageOldPath => public/assets/products/reservoir/air_jordan_1@blue.jpg
    const NewPath = GenerateFile(product,normalizeString(variantColor))
    // newPath => public/assets/unisex/sneakers/air_jordan_1/blue

    const imageNewPath = path.join(NewPath,imageExtension)
    // imageNewPath => public/assets/unisex/sneakers/air_jordan_1/blue/air_jordan_1@blue.jpg

    // Move air_jordan_1@blue.jpg 
    fs.renameSync(imageOldPath,imageNewPath)

    // Create a web friendly path \ => /
    const webPath = "/" + path.relative("public", imageNewPath).replace(/\\/g, "/");

    // Check if his variants need special value, or use the default one
    const variantPrice = variantData.price ?? GetPriceDefault(product.type)
    const variantSize = variantData.size ?? GetSizeDefault(product.type,product.sexe)
    const variantStock = variantData.stock ?? GetStockDefault()
  
    // Fill the model Catalogue with the data
    for (const size of variantSize){
      await prisma.catalogue.create({
        data : {
          productId : CreatedProduct.id,
          image : webPath,  // The back search directly the files from assets bc public is declared static
          color : variantColor,
          size : size,
          stock : variantStock,
          price : variantPrice
        }
      })
    }
  }
}