import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RESTAPIServiceService } from '../restapiservice.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, MatInputModule,MatFormFieldModule, MatIconModule, InputTextModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productsService: ProductsService, private restApiService: RESTAPIServiceService){}
  selectedItem: number = 0;
  @ViewChild('paginator') paginator: Paginator | undefined;
  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 12;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  selectedProduct: Product = {
    id: 0, 
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  ngOnInit(){
    this.fetchProducts(0, this.rows, 0);
  }
  options = [
    { name: "Show All", value: 0},
    { name: "1 star", value: 1},
    { name: "2 star", value: 2},
    { name: "3 star", value: 3},
    { name: "4 star", value: 4},
    { name: "5 star", value: 5}]
      
  
  selectItem(value: any) {
    console.log("value", value);
    console.log("value2", value.value);
      this.fetchProducts(0, 1000, value.value);
  }
  
  fetchProducts(page: number, perPage: number, rating: number){
    this.productsService.getProducts('http://localhost:3000/clothes', {page, perPage, rating})
    .subscribe( {
      next: (data: Products) => {
        this.products = data.items;
        this.totalRecords = data.total;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  toggleEditPopup(product: Product) {
    console.log("new3224");
    this.selectedProduct = product;
    console.log("id = " + this.selectedProduct.id);
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if(!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }

  onConfirmEdit(product: Product) {
    console.log("brodie2000");
    if(!this.selectedProduct.id){
      return;
    }
    console.log("brodie friday");
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onPageChange(event: any){
    this.fetchProducts(event.page, event.rows, 0);
  }
  
  onProductOutput(product: Product) {
    console.log(product, "output");
  }

  editProduct(product: Product, id: number) {
    console.log("friday4224");
    this.productsService.editProduct('http://localhost:3000/clothes/' + id, product).subscribe(
      {
        next: (data) => {
          this.fetchProducts(0, this.rows, 0);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
    
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct('http://localhost:3000/clothes/' + id).subscribe(
      {
        next: (data) => {
          this.fetchProducts(0, this.rows, 0);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  addProduct(product: Product) {
    this.productsService.addProduct('http://localhost:3000/clothes', product).subscribe(
      {
        next: (data) => {
          this.fetchProducts(0, this.rows, 0);
        },
        error: (error) => {

        }
      }
    );
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }
  
}
