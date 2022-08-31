import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categorylist: any;
  @Output() catid: EventEmitter<any> = new EventEmitter();

  constructor(public Categoryservice: CategoryService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.Categoryservice.getcategory().subscribe(
      (res) => {
        this.categorylist = res.data;
      },
      (err) => {}
    );
  }
  getid(id: any) {
    this.catid.emit(id);
  }
}
