import { Component, OnInit, Input } from '@angular/core';
import { Items } from 'src/app/models/items';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  @Input() items: Items;

  constructor() { }

  ngOnInit() {}

}
