import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../services/catalogue.service";
import {Product} from "../modele/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public currentProduct: Product;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
              private catService:CatalogueService) { }

  ngOnInit(): void {
    let url=atob(this.activatedRoute.snapshot.params.id);
    this.catService.getRessource(url)
      .subscribe(data=>{
        this.currentProduct=data;
    },error =>
      {console.log(error);} )
  }

}
