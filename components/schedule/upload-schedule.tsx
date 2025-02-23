"use client";

import { appwriteConfig } from "@/config/appwrite";
import { storage } from "@/lib/appwrite-client";
import {
  Button,
  DateInput,
  DateRangePicker,
  Form,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@heroui/react";
import { ID } from "appwrite";
import axios from "axios";
import clsx from "clsx";
import {
  CalendarFoldIcon,
  EditIcon,
  ImagePlusIcon,
  Trash2Icon,
} from "lucide-react";
import React, { FormEvent } from "react";
import { z } from "zod";

type Props = {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  onSuccess?: () => void;
};

const validationSchema = z
  .object({
    label: z.string().min(3),
    image: z.instanceof(File),
  })
  .required();

const UploadSchedule = (props: Props) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [fields, setFields] = React.useState<{
    label: string;
    image: File | null;
  }>({
    label: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    props.setIsOpen?.(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validationSchema.safeParse(fields);
    console.log("validation", validation);
    if (!validation.success) {
      const errors = validation.error.format();
      console.log("errors", errors);
      return;
    }
    setIsUploading(true);
    try {
      if (!fields.image) throw new Error("Image is required");
      const result = await storage.createFile(
        "schedules",
        ID.unique(),
        fields.image
      );

      console.log("result", result);
      await axios
        .post("/api/schedule", {
          label: fields.label,
          image_url: `${appwriteConfig.endpoint}/storage/buckets/schedules/files/${result.$id}/view?project=${appwriteConfig.projectId}`,
        })
        .then((resp) => {
          if (resp.data.success) {
            props.onSuccess?.();
            handleClose();
            setFields({ label: "", image: null });
            setImagePreview((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return null;
            });
          }
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  React.useEffect(() => {
    props.isOpen && setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      hideCloseButton
      onClose={handleClose}
      title="Upload Schedule"
    >
      <Form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalBody>
            <div className="aspect-square relative w-full overflow-hidden bg-foreground-100 text-foreground-300 flex justify-center items-center rounded-xl my-2">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  className="w-full h-full aspect-square object-cover object-top"
                />
              ) : (
                <ImagePlusIcon
                  onClick={() => fileInputRef.current?.click()}
                  className="w-16 h-16 text-foreground-500"
                  strokeWidth={1}
                />
              )}
              <div
                className={clsx(
                  "absolute flex gap-2 bottom-2 right-2 z-10",
                  imagePreview ? "visible" : "hidden"
                )}
              >
                <Button
                  isIconOnly
                  onPress={() => fileInputRef.current?.click()}
                  variant="flat"
                >
                  <EditIcon className="w-5 h-5" />
                </Button>
                <Button
                  isIconOnly
                  color="danger"
                  variant="flat"
                  onPress={(e) => {
                    setFields({ ...fields, image: null });
                    setImagePreview((prev) => {
                      if (prev) URL.revokeObjectURL(prev);
                      return null;
                    });
                  }}
                >
                  <Trash2Icon className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <Input
              className="text-center"
              value={fields.label}
              name="label"
              type="text"
              size="lg"
              isRequired
              startContent={
                <CalendarFoldIcon className="w-5 h-5 me-1 text-foreground-500" />
              }
              placeholder="Label Schedule"
              onChange={(e) => setFields({ ...fields, label: e.target.value })}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                console.log("file", file);
                if (!file) return;
                const preview = URL.createObjectURL(file);
                setImagePreview((prev) => {
                  if (prev) URL.revokeObjectURL(prev);
                  return preview;
                });
                setFields({ ...fields, image: file });
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={isUploading}
              type="button"
              variant="bordered"
              onPress={handleClose}
            >
              Batal
            </Button>
            <Button isLoading={isUploading} type="submit" color="primary">
              Tambahkan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default UploadSchedule;
