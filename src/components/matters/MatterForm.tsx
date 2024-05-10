import React, { useEffect, useState } from "react";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Client,
  Lawyer,
  AddNewMatterProps,
  MatterDtoErrors,
  MatterDto,
} from "../../types/matterTypes";

export const MatterForm = ({
  clients,
  lawyers,
  onAddMatter,
}: AddNewMatterProps) => {
  const [formData, setFormData] = useState<MatterDto>({
    client_id: 0,
    matter_type: "",
    lawyer_id: 0,
    status: "",
    description: "",
  });
  const [errors, setErrors] = useState<MatterDtoErrors>({});
  const [isOpen, setIsOpen] = useState(false);

  const validateForm = () => {
    let tempErrors: MatterDtoErrors = {};
    if (!formData.client_id) tempErrors.client_id = "Client name is required";
    if (!formData.matter_type)
      tempErrors.matter_type = "Matter type is required";
    if (!formData.lawyer_id) tempErrors.lawyer_id = "Attorney Name is required";
    if (!formData.status) tempErrors.status = "Status is required";
    if (!formData.description)
      tempErrors.description = "Description is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((value) => value === undefined);
  };

  const handleChange = (value: string | number, type: string) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
    setErrors((prev) => ({ ...prev, [type]: null }));
  };

  const handleCancel = () => {
    setFormData({
      client_id: 0,
      matter_type: "",
      lawyer_id: 0,
      status: "",
      description: "",
    });
    setErrors({});
  };

  const handleSubmit = () => {
    console.log(formData);
    if (validateForm()) {
      onAddMatter(formData);
      setIsOpen(false);
      setFormData({
        client_id: 0,
        matter_type: "",
        lawyer_id: 0,
        status: "",
        description: "",
      });
      setErrors({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto"
          variant="default"
          onClick={() => setIsOpen(true)}
        >
          Add New Matter
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-950 rounded-lg p-6 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add New Matter</h2>
        </div>
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base" htmlFor="clientName">
                Client Name
              </Label>
              <Select
                required
                onValueChange={(e) => handleChange(Number(e), "client_id")}
                value={formData.client_id ? formData.client_id.toString() : ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients?.map((client) => (
                    <SelectItem
                      key={client.client_id}
                      value={client.client_id.toString()}
                    >
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.client_id && (
                <span className="text-red-500">{errors.client_id}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-base" htmlFor="matterType">
                Matter Type
              </Label>
              <Select
                required
                onValueChange={(e) => handleChange(e, "matter_type")}
                value={formData.matter_type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a matter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Litigation">Litigation</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Intellectual Property">
                    Intellectual Property
                  </SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              {errors.matter_type && (
                <span className="text-red-500">{errors.matter_type}</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base" htmlFor="responsibleAttorney">
                Responsible Attorney
              </Label>
              <Select
                required
                onValueChange={(e) => handleChange(Number(e), "lawyer_id")}
                value={formData.lawyer_id ? formData.lawyer_id.toString() : ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a responsible attorney" />
                </SelectTrigger>
                <SelectContent>
                  {lawyers?.map((lawyer) => (
                    <SelectItem
                      key={lawyer.lawyer_id}
                      value={lawyer.lawyer_id.toString()}
                    >
                      {lawyer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.lawyer_id && (
                <span className="text-red-500">{errors.lawyer_id}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-base" htmlFor="status">
                Status
              </Label>
              <Select
                required
                onValueChange={(e) => handleChange(e, "status")}
                value={formData.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <span className="text-red-500">{errors.status}</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-base" htmlFor="description">
              Detailed Description
            </Label>
            <Textarea
              className="min-h-[120px]"
              placeholder="Enter a detailed description"
              required
              onChange={(e) => handleChange(e.target.value, "description")}
              value={formData.description}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6 gap-2">
          <Button onClick={handleSubmit} variant="default">
            Save
          </Button>
          <div>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
