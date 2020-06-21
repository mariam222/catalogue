import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CatalogueService} from "../services/catalogue.service";
import {newArray} from "@angular/compiler/src/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
public produits:any;
public size:number=5;
public currentPage:number=0;
public totalPages:number;
public pages:Array<number>;
public currentKeyword :string="";
  constructor(private catService:CatalogueService,private router:Router) { }

  ngOnInit(): void {
  }

  onGetProducts() {
    this.catService.getProducts(this.currentPage,this.size)
      .subscribe(data=>{
        this.produits=data;
        this.totalPages=data["page"].totalPages;
        this.pages=newArray<number>(this.totalPages);
      },err=>{console.log(err);});

  }

  onPageProduct(i: number) {
    this.currentPage=i;
    this.chercherProduit();
  }

  onChercher(form) {
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.chercherProduit();
  }
  chercherProduit(){

    this.catService.getProductsBykeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data=>{
        this.produits=data;
        this.totalPages=data["page"].totalPages;
        this.pages=newArray<number>(this.totalPages);
      },err=>{console.log(err);});
  }

  onDeleteProduct(p) {
    let conf=confirm("Etes vous sur?");
    if (conf) {this.catService.deleteRessource(p._links.self.href)
      .subscribe(data=>{this.chercherProduit();
      },err=>{console.log(err);})
    }

  }

  onEditProduct(p) {
    let url=p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+btoa(url));

  }
}
