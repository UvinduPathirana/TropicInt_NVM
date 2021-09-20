import { Products } from '../../models/Products';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  private http: HttpClient;
  private baseUrl: string;
  public products: any;
  public vegetable: any;
  public categoryId: any;

  constructor(
    http: HttpClient, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService
  ) {
    this.http = http;
    this.baseUrl = environment.BASE_URL;
    this.toastr = toastr;
  }

  // Toaster Warning

  // showToaster() {
  //   this.toastr.success("Hello, I'm the toastr message.")
  // }

  // // Delete Vegetable

  removeProduct(product) {
    let self = this;
    console.log(product)
    this.http.delete<Products>(this.baseUrl + 'products/delete/' + product.Id)
      .subscribe(
        function (data) {
          let index = self.products.indexOf(data);
          self.products.splice(index, 1);
          self.toastr.success("Product Was Deleted");
        }
      )
    // selectedDeleteTag == null;
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryid');
    console.log(this.categoryId);
    let self = this;
    this.http.get<Products[]>(this.baseUrl + 'categories/' + this.categoryId)
      .subscribe(
        function (data) {
          self.products = data;
          console.log(self.products)
        }
      )
  }

}
