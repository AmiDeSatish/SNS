const card = document.querySelector(".shop-section-products")
let ShopSectionHTML = ""


//Generate the HTML for the shop section of the home page 
async function generateProductCard(){
  let products
  try{
    // Ask for products data to the server
    const response = await fetch("/api/products/infos")

    if(!response.ok){throw new Error("Response not ok in generate home page")}
    
    // Stock them in products, who will help the generation of the shop section on the home page
    products = await response.json()
    console.log("Voici products :", products)
    products.forEach(product => {
      ShopSectionHTML += `
      <div class="card">
        <img class="product-image" src="..${product.image}">
        <div class="product-infos">
          <p class="product-brand">${product.brand.toUpperCase()}</p>
          <p class="product-name">${product.name}</p>
          <p class="product-price">$${product.price}</p>
        </div>
      </div>
      `
    });
  }
  catch(err){
    console.log("Erreur dans la tentative de récupération des données des produits pour la génération de la section shop de home page")
    console.log(err)
  }
  card.innerHTML = ShopSectionHTML
}

generateProductCard()
