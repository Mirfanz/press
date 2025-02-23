import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FinanceReportType = {
  $id: string;
  // Tambahkan properti lain yang sesuai dengan data Anda
  label: string;
  amount: number;
  date: string;
  income: boolean;
};

export type TaxType<WithUsers extends boolean = false> = WithUsers extends true
  ? {
      $id: string;
      $createdAt: string;
      $updatedAt: string;
      code: number;
      year: number;
      month: number;
      users: UserType[];
      paidUsers: UserType[];
    }
  : {
      $id: string;
      $createdAt: string;
      $updatedAt: string;
      year: number;
      month: number;
      code: number;
      users: string[];
      paidUsers: string[];
    };

export type UserType = {
  $id: string;
  name: string;
  labels: string[];
  status: boolean;
  prefs: {
    image_url?: string;
  };
};

export type ScheduleType = {
  $id: string;
  label: string;
  image_url: string;
  $createdAt: string;
};
