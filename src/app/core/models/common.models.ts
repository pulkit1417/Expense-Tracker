export interface IExpense{
    key?: string;
    title: string;
    price: string;
    date: string | Date;
    description?: string;
}