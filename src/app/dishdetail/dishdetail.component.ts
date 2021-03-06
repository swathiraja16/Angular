import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Comment } from '../shared/comment';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  com: Comment;
  errMess: string;
  dishcopy = null;
  visibility = 'shown';
  commentErrors = {
    'autor': '',
    'comment': ''
  };

  validationmsgs= {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name should be at least 2 characters long',
      'maxlength': 'Author name cannot be more that 25 characters long'
    },
    'comment': {
      'required': 'Comment is required.'
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder, @Inject('BaseURL') private BaseURL) { 
     
    }

  ngOnInit() {
    this.createform();
   this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
   this.route.params
      .switchMap((params: Params) => { this.visibility='hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
          errmess => { this.dish = null; this.errMess = <any>errmess; });
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: number){
    let index =  this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
  }

  createform(): void {
    this.commentForm = this.fb.group({
      rating:5,
      comment:['', Validators.required],
      author:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      date:''
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged());
    this.onValueChanged(); //(re)set validations message
  }

  onValueChanged(data?:any){
    if(!this.commentForm) {return;}
    const form = this.commentForm;
    for (const field in this.commentErrors){
      //clear previous error messages
      this.commentErrors[field]='';
      const control= form.get(field);
      if (control && control.dirty && !control.valid){
        const messages=this.validationmsgs[field];
        for (const key in control.errors){
          this.commentErrors[field] += messages[key] + '';
        }
      }
    }
  }

  onSubmit(){
    this.com =  this.commentForm.value;
    this.com.date = new Date().toISOString();
    console.log(this.com);
    this.dishcopy.comments.push(this.com)
    this.dishcopy.save().subscribe(dish => {this.dish=dish; console.log(this.dish);});
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    
  }
}