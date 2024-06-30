import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense } from '../../core/models/common.models';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})
export class ExpenseComponent implements OnInit {
  expenses: IExpense[] = [];
  totalExpense = 0;

  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses() {
    this.expenseService
      .getAllExpenses()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          this.expenses = [];
          this.totalExpense = 0;
          data.forEach((item) => {
            let expense = item.payload.toJSON() as IExpense;
            if (expense && expense.price != null) {
              this.totalExpense += parseFloat(expense.price);
              this.expenses.push({
                key: item.key || '',
                price: expense.price,
                title: expense.title,
                date: expense.date,
                description: expense.description,
              });
            } else {
              // console.error('Invalid expense data:', expense); // Log invalid expense
            }
          });
        },
      });
  }

  editExpense(key: string) {
    this.router.navigate(['/expense-form/' + key]);
  }

  removeExpense(key: string) {
    if (window.confirm('Are you sure you want to remove?')) {
      this.expenseService.deleteExpense(key)
    }
  }
}
