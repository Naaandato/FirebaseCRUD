import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddShoppingPage} from "../add-shopping/add-shopping";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {ShoppingItem} from "../../models/shopping-item/shopping-item";

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {

    //point the shopping list reference at firebase. We can push and retrieve from database
    this.shoppingListRef$ = this.database.list('shopping-list');
    //this.shoppingListRef$.subscribe(x => console.log(x));

  }

  selectShoppingItem(shoppingItem: ShoppingItem){

    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {

          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('The user has selected the cancel button');
          }
        }
      ]
    }).present();
  }


  navigateToAddShoppingList() {
    this.navCtrl.push(AddShoppingPage);
  }

}
