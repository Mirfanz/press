"use client";

import { Alert, Link } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import ReportCard from "../finance/report-card";

import UserCard from "./user-card";

import { FinanceReportType } from "@/types";

const Home = () => {
  return (
    <main>
      <UserCard />
      <section className="mt-5">
        <Alert
          hideIconWrapper
          isClosable
          className="mb-3"
          description="Bayar apa mau dipecat?"
          variant="faded"
          // color="warning"
          // description="Bayar kalau gamau dipecatt"
          title="Belum Bayar Kas"
        />
      </section>
    </main>
  );
};

export default Home;
