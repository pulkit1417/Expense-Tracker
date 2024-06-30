// expense.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IExpense } from '../models/common.models';
import { firebaseConfig } from '../../constants/constants'; 
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private dbPath = '/expenses';
  expensesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.expensesRef = db.list(this.dbPath);
  }

  getAllExpenses() {
    return this.expensesRef;
  }

  getExpense(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addExpense(expense: IExpense) {
    return this.expensesRef.push(expense);
  }

  updateExpense(key: string, expense: IExpense) {
    return this.expensesRef.update(key, expense);
  }

  deleteExpense(key: string) {
    return this.expensesRef.remove(key);
  }
}
