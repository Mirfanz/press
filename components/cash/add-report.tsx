"use client";

import {
  Button,
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
import React, { useState } from "react";

type Props = {
  refetch: () => void;
};

const AddReport = (props: ModalProps & Props) => {
  const [addReportFields, setAddReportFields] = useState<{
    income?: boolean;
    amount?: number;
    date?: string;
    label?: string;
  }>({});

  const handleAddReport = async () => {
    axios.post("/api/cash/report", addReportFields).then((resp) => {
      console.log("resp", resp);
      props.onClose ? props.onClose() : "";
      props.refetch();
    });
  };

  return (
    <Modal {...props} hideCloseButton placement="auto">
      <ModalContent className="">
        <ModalBody className="pt-8">
          <Select
            // label="Jenis Laporan"
            isRequired
            color={addReportFields.income ? "success" : "danger"}
            labelPlacement="outside"
            placeholder="Pemasukan / Pengeluaran"
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
            isRequired
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
            isRequired
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
            isRequired
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
          <Button fullWidth color="primary" onPress={handleAddReport}>
            Tambah
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddReport;
