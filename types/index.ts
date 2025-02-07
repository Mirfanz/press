import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface CashReportType {
  $id: string;
  // Tambahkan properti lain yang sesuai dengan data Anda
  label: string;
  amount: number;
  date: string;
  income: boolean;
}
