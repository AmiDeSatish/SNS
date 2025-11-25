export function capitalizeFirstLetter(str){
  if(!str){return ""}
  return str.charAt(0).toUpperCase() + str.slice(1)
}


// Normalize the given string : 
// " " => _
//  -  => _
//  à  => a
//  é  => e
//  è  => e
// Sac à main éclaircie => Sac_a_main_eclaircie
export function normalizeString(str){
  const map = {
    " ": "_", 
    "-": "_", 
    "é": "e", 
    "è": "e", 
    "ê": "e", 
    "ë": "e", 
    "à": "a", 
    "â": "a", 
    "ä": "a", 
    "ô": "o", 
    "ö": "o", 
    "î": "i", 
    "ï": "i", 
    "û": "u", 
    "ü": "u", 
    "ç": "c"
  }

  let result = ""
  for (var i = 0; i < str.length; i++){
    const char = str[i]
    if (map[char]){
      result += map[char]
    }
    else{result += char.toLowerCase()}
  }
  return result
}

// Send back the color from the namefile 
export function SeparateColorFromName(text){
  const startColor = text.indexOf("@")
  const endColor = text.lastIndexOf(".")
  return text.substring(startColor + 1,endColor)
}

export function normalizeDataProducts(products){
  products.forEach(product => {
    const productName = normalizeString(product.name)
    for(const [color,colordata] of Object.entries(product.colorsAvailable)){
      console.log(productName + "@" + normalizeString(color))
    }
  })
}

//console.log(normalizeString("Cloudflow 5 AD@Obsidian"))