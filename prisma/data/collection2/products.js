import { normalizeDataProducts } from "../../../src/utils/string.js"

export const products = [
  {
    type : "Clothes",
    brand : "SNS",
    sexe : "unisex",
    name : "Anxiety Tee",
    colorsAvailable : {
      Black : {}
    }
  },
  {
    type : "Sneakers",
    brand : "Jordan",
    sexe : "Male",
    name : "Air Jordan 4 Retro OG",
    colorsAvailable : {
      White : {
        price : 210,
        stock : 15
      },
      Brown : {
        price : 210,
        stock : 15
      },
      Black : {
        price : 210,
        stock : 15
      }
    }
  },
  {
    type : "Clothes",
    brand :"SNS",
    name : "FC 23 Home Jersey",
    colorsAvailable : {
      Purple : {}
    }
  },
  {
    type : "Accessories",
    brand : "Wawa",
    name : "Tre Kronor Hypno Cap",
    colorsAvailable : {
      Green : {
        price : 55
      }
    }
  },
  {
    type : "Accessories",
    brand : "SNS",
    name : "Viagra Boys scarf",
    colorsAvailable : {
      Black : {
        price : 30
      }
    }
  }
]

// normalizeDataProducts(products)