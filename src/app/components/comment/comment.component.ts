import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {}

}
