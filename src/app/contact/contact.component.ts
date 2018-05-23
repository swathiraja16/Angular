import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname' : '',
    'telnum' : '',
    'email' : ''
  };

  validationMessages = {
    'firstname': {
      'required': 'Firstname is required.',
      'minlength': 'First name should be at least 2 characters long',
      'maxlength': 'First name cannot be more that 25 characters long'
    },
    'lastname':{
      'required': 'Firstname is required.',
      'minlength': 'Last name should be at least 2 characters long',
      'maxlength': 'Last name cannot be more that 25 characters long'
    },
    'telnum': {
      'required': 'Tel. num is required',
      'pattern': 'Tel. num should contain only numbers'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email is not in valid format'
    },
  };

  constructor(private fb: FormBuilder) { 
    this.createForm();
  
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum:[0,[Validators.required, Validators.pattern]],
      email:['',[Validators.required, Validators.email]],
      agree:false,
      contacttype:'None',
      message:''
    });
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged());
    this.onValueChanged(); //(re)set validations message
  }

  onSubmit(){
    this.feedback =  this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onValueChanged(data?:any){
    if(!this.feedbackForm) {return;}
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      //clear previous error messages
      this.formErrors[field]='';
      const control= form.get(field);
      if (control && control.dirty && !control.valid){
        const messages=this.validationMessages[field];
        for (const key in control.errors){
          this.formErrors[field] += messages[key] + '';
        }
      }
    }
  }
}
