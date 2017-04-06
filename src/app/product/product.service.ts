/**
 * Created by SergST on 28.03.2017.
 */

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class Product {
  // Unique Id
  id: string;
  // Ref on category belongs to
  categoryId: string;
  // The title
  title: string;
  // Price
  price: number;
  // MArk product with specialproce
  isSpecial: boolean;
  // Description
  desc: string;
  // Path to small image
  imageS: string;
  // Path to large image
  imageL: string;
}

@Injectable()
export class ProductService {
  productUrl = 'app/products';

  constructor(private http: Http) {
  }

  getProducts(category?: string, search?: string): Observable<Product[]> {
    let url = this.productUrl;

    if (category) {
      url += `/?categoryId=${category}`;
    } else if (search) {
      url += `/?title=${search}`;
    }
    return this.http
      .get(url)
      .map((response: Response) => response.json().data as Product[])
      .catch(this.handleError);
  }

  getProduct(id: string): Observable<Product> {
    let url = this.productUrl + `/${id}`;
    return this.http
      .get(url)
      .map((response: Response) => response.json().data as Product)
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    let errMsg = (error.message) ? error.message : error.status ?
      `${error.status} - ${error.statusText}` : 'Server error';
    window.alert(`An error occurred: ${errMsg}`);
    return Observable.throw(errMsg);
  }
}

