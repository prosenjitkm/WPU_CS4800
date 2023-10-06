export class Product {
  id?: number;
  userId: number = 0;  // Default value
  productId?: number;  // This seems redundant given the presence of 'id'. You might want to reconsider having both.
  productName: string = '';
  productCategory: string = '';
  productQuantity: number = 0;
  productPrice: number = 0;
  productDescription: string = '';
  productSalePrice?: number;  // Assuming it's optional since not all products might be on sale
  isOnSale: boolean = false;
  isAvailable: boolean = true;  // Default to available; adjust as per your requirements
  postedDate?: Date;  // Assuming it might be set automatically on the backend during creation
}
