import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShoppingItem} from "../../models/shopping-item/shopping-item";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

/**
 * Generated class for the AddShoppingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;
  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:  AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    //console.log(shoppingItem);
    //this.shoppingItemRef$.push(this.shoppingItem);

    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    //reset shoppingitem
    this.shoppingItem = {} as ShoppingItem;

    //navigate the user bach to list
    this.navCtrl.pop();

  }

}
