import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products = [
        {id: 1, name: 'laptop', price: 1000},
        {id: 2, name: 'phone', price: 500},
        {id: 3, name: 'tablet', price: 700},
    ];
        getAllProducts() {
            return this.products
        }

        getProductsById(id:number){
            return this.products.find((product:any) => product.id === id)
        }
    
}
