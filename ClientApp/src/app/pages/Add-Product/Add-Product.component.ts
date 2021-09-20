
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-Add-Product',
  templateUrl: './Add-Product.component.html',
  styleUrls: ['./Add-Product.component.css']
})
export class AddProductComponent implements OnInit {

  public vegetableId: any;

  private http: HttpClient;
  private baseUrl: string;
  // private toastr: ToastrService;
  constructor(http: HttpClient, private router: Router, private route: ActivatedRoute,) {
    this.http = http;
    this.baseUrl = environment.BASE_URL;
  }

  ngOnInit() {
    this.vegetableId = this.route.snapshot.paramMap.get('vegetableid');
    console.log(this.vegetableId);

  }

}
