import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../../firestore.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
  }

}
