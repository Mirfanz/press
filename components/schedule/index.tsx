"use client";

import { Button, Card, CardFooter, CardHeader, Image } from "@heroui/react";
import {
  ArrowDownToLineIcon,
  CalendarDaysIcon,
  PlusIcon,
  PlusSquareIcon,
} from "lucide-react";
import React from "react";
import { useAuth } from "../auth-provider";
import { ScheduleType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../loading";
import UploadSchedule from "./upload-schedule";
import Header from "../header";
import Link from "next/link";

const Schedule: React.FC = () => {
  const auth = useAuth();
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
      return (await axios.get("/api/schedule")).data.data;
    },
  });
  return (
    <main className="">
      <Header
        icon={<CalendarDaysIcon className="h-5 w-5 md:w-6 md:h-6" />}
        title="Schedule Kerja"
        endContent={
          auth.hasRole("leader", "subleader") && (
            <Button
              size="sm"
              color="primary"
              onPress={() => setIsUploadOpen(true)}
              startContent={<PlusIcon className="w-4 h-4" />}
            >
              Tambah
            </Button>
          )
        }
      />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {data?.map((item: ScheduleType) => (
            <Card
              key={item.$id}
              className=""
              isHoverable
              isPressable
              as={Link}
              href={item.image_url}
              target="_blank"
            >
              <CardHeader className="">
                <h3 className="text-center py-1 mx-auto">{item.label}</h3>
              </CardHeader>
              <Image
                className="aspect-square object-cover object-top"
                src={item.image_url}
              />
            </Card>
          ))}
        </div>
      )}
      <UploadSchedule
        isOpen={isUploadOpen}
        onSuccess={() => refetch()}
        setIsOpen={setIsUploadOpen}
      />
    </main>
  );
};

export default Schedule;
