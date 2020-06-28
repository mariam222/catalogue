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
  private url: string;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,
              private catService:CatalogueService) { }

  ngOnInit(): void {
    this.url =atob(this.activatedRoute.snapshot.params.id);
    this.catService.getRessource(this.url)
      .subscribe(data=>{
        this.currentProduct=data;
    },error =>
      {console.log(error);} )
  }

  OneUpdateProduct(value: any) {
    this.catService.updateRessource(this.url,value)
      .subscribe(data=>{
        alert("mise a jour effectuée avec succès")
      },error =>
      {console.log(error);} )

  }
}
