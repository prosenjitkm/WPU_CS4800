

export interface Product {
  sku: number;
  name: string;
  type: string;
  price: number;
  upc: string;
  category: Category[];
  shipping: number;
  //description: string;
  manufacturer: string;
  model: string;
  url: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
}

export interface Cate {
  category: string;
  url: string;
}

const exampleProduct: Product = {
  sku: 43900,
  name: "Duracell - AAA Batteries (4-Pack)",
  type: "HardGood",
  price: 5.49,
  upc: "041333424019",
  category: [
    { id: "pcmcat312300050015", name: "Connected Home & Housewares" },
    { id: "pcmcat248700050021", name: "Housewares" },
    { id: "pcmcat303600050001", name: "Household Batteries" },
    { id: "abcat0208002", name: "Alkaline Batteries" },
  ],
  shipping: 5.49,
  //description: "Compatible with select electronic devices; AAA size; DURALOCK Power Preserve technology; 4-pack",
  manufacturer: "Duracell",
  model: "MN2400B4Z",
  url: "http://www.bestbuy.com/site/duracell-aaa-batteries-4-pack/43900.p?id=1051384074145&skuId=43900&cmp=RMXCC",
  image: "http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg",
};

export const columnNames: string[] = Object.keys(exampleProduct);
/*
export class Product {
  id: number = 0;
  userId: number = 0;  // Default value
  productId: number = 0;  // This seems redundant given the presence of 'id'. You might want to reconsider having both.
  productName: string = '';
  productCategory: string = '';
  productQuantity: number = 0;
  productPrice: number = 0;
  productSalePrice: number = 0;  // Assuming it's optional since not all products might be on sale
  isOnSale: boolean = false;
  isAvailable: boolean = true;  // Default to available; adjust as per your requirements
  postedDate: Date = new Date();
  img: string = "";
}
*/
