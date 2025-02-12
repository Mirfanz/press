export type CreateFinancialReport = {
  label: string;
  income: boolean;
  date: Date;
  amount: number;
};

export type CreateTax = {
  users: string[];
  paidUsers: string[];
  code: number;
  year: number;
  month: number;
};
