import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../modele/product.model";


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string="http://localhost:8082";

  constructor(private httpClient:HttpClient ) { }

  public getProducts(page:number,size:number){
    return this.httpClient.get(this.host+"/produits?page="+page+"&size="+size);
  }
  public getProductsBykeyword(mc:string,page:number,size:number){
    return this.httpClient.get(this.host+"/produits/search/byDesignationPage?mc="+mc+"&page="+page+"&size="+size);
  }
  public deleteRessource(url){
    return this.httpClient.delete(url);

  }
  public saveRessource(url,data):Observable<Product>
  {
    let objectObservable = this.httpClient.post(url,data);
    // @ts-ignore
    return objectObservable;
  }
  public getRessource(url):Observable<Product> {
    let objectObservable = this.httpClient.get(url)
    // @ts-ignore
    return objectObservable;
  }
}
