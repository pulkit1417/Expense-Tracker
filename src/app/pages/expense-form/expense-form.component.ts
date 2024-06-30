import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ExpenseService } from '../../core/services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IExpense } from '../../core/models/common.models';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css',
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;
  expenseId = '';

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.expenseForm = this.fb.group({
      price: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.expenseId = params['id'];
        this.getExpenseData(this.expenseId);
      },
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const formData = this.expenseForm.value;
      
      if (this.expenseId) {
        // Updating existing expense
        this.expenseService.updateExpense(this.expenseId, formData)
          .then(() => {
            console.log('Expense updated successfully');
            this.router.navigate(['']);
          })
          .catch(error => console.error('Error updating expense:', error));
      } else {
        // Adding new expense
        this.expenseService.addExpense(formData)
          .then(() => {
            console.log('New expense added successfully');
            this.router.navigate(['']);
          })
          .catch(error => console.error('Error adding new expense:', error));
      }
    } else {
      this.expenseForm.markAllAsTouched();
      console.log('Form is invalid', this.expenseForm.errors);
    }
  }
  getExpenseData(key: string) {
    this.expenseService.getExpense(key).snapshotChanges().subscribe({
      next: (data) =>{
        let expense = data.payload.toJSON() as IExpense;
        this.expenseForm.setValue(expense);
      }
    })
  }
}
