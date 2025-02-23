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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 md:w-6 md:h-6" /> Schedule Kerja
        </h1>
        <Button
          className="hidden md:flex"
          startContent={<PlusSquareIcon className="w-4 h-4" />}
          onPress={() => setIsUploadOpen(true)}
          color="primary"
        >
          Tambah
        </Button>
        <Button
          className="md:hidden"
          size="sm"
          onPress={() => setIsUploadOpen(true)}
          startContent={<PlusSquareIcon className="w-5 h-5" />}
        >
          Tambah
        </Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {data?.map((item: ScheduleType) => (
            <Card key={item.$id} className="shadow-md">
              <CardHeader className="">
                <h3 className="text-center py-1 mx-auto">{item.label}</h3>
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute right-3"
                  size="sm"
                >
                  <ArrowDownToLineIcon className="w-5 h-5 text-foreground-500" />
                </Button>
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
