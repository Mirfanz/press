"use client";

import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProps,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import Swal from "sweetalert2";

type Props = {
  refetch: () => void;
};

const AddReport = (props: Omit<ModalProps, "children"> & Props) => {
  const [loading, setLoading] = useState(false);
  const [addReportFields, setAddReportFields] = useState<{
    income?: boolean;
    amount?: number;
    date?: string;
    label?: string;
  }>({});

  const submitAddReport = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target as HTMLFormElement).checkValidity()) return;
    const { isConfirmed } = await Swal.fire({
      // title: "Tambah",
      text: "Apakah data yang dimasukkan sudah sesuai?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjut",
      cancelButtonText: "Belum",
    });
    if (!isConfirmed) return;
    setLoading(true);
    axios
      .post("/api/cash/report", addReportFields)
      .then((resp) => {
        console.log("resp", resp);
        props.onClose?.();
        setAddReportFields({});
        props.refetch();
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  return (
    <Modal {...props} hideCloseButton placement="auto">
      <Form onSubmit={submitAddReport}>
        <ModalContent className="">
          <ModalBody className="pt-8">
            <Select
              label="Jenis Laporan"
              required
              isRequired
              placeholder=" "
              onSelectionChange={(e) =>
                setAddReportFields({
                  ...addReportFields,
                  income: e.currentKey === "income",
                })
              }
            >
              <SelectItem key="income">Pemasukan</SelectItem>
              <SelectItem key="cost">Pengeluaran</SelectItem>
            </Select>
            <Input
              required
              isRequired
              name="amount"
              label="Jumlah (Rp)"
              min={1}
              placeholder="Masukan angka saja"
              type="number"
              value={addReportFields.amount?.toString()}
              onChange={(e) =>
                setAddReportFields({
                  ...addReportFields,
                  amount: parseInt(e.target.value),
                })
              }
            />
            <Input
              required
              isRequired
              name="date"
              label="Tanggal"
              labelPlacement="inside"
              type="date"
              value={addReportFields.date}
              onChange={(e) =>
                setAddReportFields({
                  ...addReportFields,
                  date: e.target.value,
                })
              }
            />
            <Textarea
              required
              isRequired
              name="label"
              label="Keterangan"
              value={addReportFields.label}
              onChange={(e) =>
                setAddReportFields({
                  ...addReportFields,
                  label: e.target.value,
                })
              }
            />
          </ModalBody>
          <ModalFooter className="">
            <Button fullWidth color="primary" type="submit">
              Tambah
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default AddReport;
