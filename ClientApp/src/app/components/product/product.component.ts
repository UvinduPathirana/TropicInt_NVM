import { Component, Inject, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/models/Products';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Categories } from 'src/app/models/Categories';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input('vegetableId') vegetableId: any;
  @Input('categoryId') categoryId: any;

  private http: HttpClient;
  private baseUrl: string;
  public filename: any;
  images;

  public categories: Categories[]
  public product: Products;

  constructor(http: HttpClient, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService) {
    this.http = http;
    this.baseUrl = environment.BASE_URL;
    this.toastr = toastr;
  }

  // Image upload

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      // this.filename = file.originalname;
    }
  }

  onSubmit() {
    const self = this;
    const formData = new FormData();
    formData.append('file', this.images);
    this.http.post<any>('http://localhost:3000/file', formData)
      .subscribe(
        // (res) => (console.log(res.filename)),
        (res) => self.product.Image = res.filename,
        (err) => console.log(err),
      );
    console.log(self.product.Image);
  }

  saveProduct() {
    let self = this;
    // check if:: new lot
    if (this.vegetableId == "new") {
      this.http.post<Products>(this.baseUrl + 'products', this.product)
        .subscribe(
          function (data) {
            self.product = data;
            // self.router.navigate(['/dashboard/organization/' + self.organizationId + '/stages/' + self.stage.id]);
            self.toastr.success("Saved Successfully");
            console.log(self.product);
            // this.product.Image = this.images.originalname;
            console.log("saved successfully");
          }
        )
    }
    // check if:: existing lot
    else {
      this.http.put<Products>(this.baseUrl + 'products/' + this.vegetableId, this.product)
        .subscribe(
          function (data) {
            self.toastr.success("Updated Stage Successfully");
            console.log("updated successfully");
          }
        )
    }
  }

  getProduct() {
    //let self = this;
    // check if:: new lot
    let self = this;
    if (this.vegetableId == "new") {
      this.product = {
        Id: null,
        Name: '',
        CategoryId: this.categoryId,
        Image: self.filename,
      }
    }
    else
    // check if:: existing lot
    {
      this.http.get<Products>(this.baseUrl + 'products/' + this.vegetableId)
        .subscribe(
          data => {
            let self = this;
            self.product = data;
            console.log(this.product);
          }
        )
    }
  }

  getCategories() {
    let self = this;
    this.categories = []
    this.http.get<Categories[]>(this.baseUrl + 'categories')
      .subscribe(
        function (data) {
          self.categories = data;
          console.log(self.categories);
        }
      )
  }

  ngOnInit() {
    console.log(this.vegetableId);
    this.getProduct();
    this.getCategories();
  }


}
