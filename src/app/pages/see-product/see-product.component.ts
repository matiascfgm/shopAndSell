import { Component, OnInit } from '@angular/core';
import {ImgurApiService} from '../../core/services/imgur.service';

@Component({
  selector: 'app-see-product',
  templateUrl: './see-product.component.html',
  styleUrls: ['./see-product.component.scss']
})
export class SeeProductComponent implements OnInit {

  constructor(private imgurService: ImgurApiService) { }

  ngOnInit() {
  }

}
