import React, { useEffect } from "react";


//fetch
import ModalWasher1 from "./ModalWasher1";
import ModalWasher2 from "./ModalWasher2";

type Props = {
  initialRef: any;
  handleChangeCreateWasher: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setError: (e: any) => void;
  handleModalClose: () => void;
  setStepperStep: (value: {
    washerData1: boolean,
    washerData2: boolean,
  }) => void;
  stepperStep: {
    washerData1: boolean,
    washerData2: boolean,
  }
  isButtonDisabled: boolean,
  createWasher: {
    name: string,
    documento: string,
    exp_id_date: string,
    phone_number: string,
    address: string
    city: string,
    department: string
  }
  isButtonDisabledWasher2: boolean,
  handleSubmit: (e: any) => void,
  loading: boolean
  editWasher: any
  setCreateWasher: any
  setValidation: any
};

const ModalAddWasherr = ({
  initialRef,
  handleChangeCreateWasher,
  setError,
  handleModalClose,
  setStepperStep,
  stepperStep,
  isButtonDisabled,
  createWasher,
  isButtonDisabledWasher2,
  handleSubmit,
  loading,
  editWasher,
  setCreateWasher,
  setValidation
}: Props) => {
  const handleDocumentoChange = (e: any) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      handleChangeCreateWasher(e);
      setError(true); // Borra el mensaje de error si es válido
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    if (editWasher) {
      setCreateWasher({
        name: editWasher.name || "",
        documento: editWasher.documentId || "",
        exp_id_date: editWasher.exp_id_date || "",
        phone_number: editWasher.phone_number || "",
        address: editWasher.address || "",
        city: editWasher.city || "",
        department: editWasher.department || ""
      })
      setValidation({
        name: !!editWasher.name,
        documento: !!editWasher.documentId,
        exp_id_date: !!editWasher.exp_id_date,
        phone_number: !!editWasher.phone_number,
        address: !!editWasher.address,
        city: !!editWasher.city,
        department: !!editWasher.department
      })
    }
  }, [editWasher])

  const { washerData1, washerData2 } = stepperStep;
  return (
    <>
      {
        washerData1
          ? <ModalWasher1
            indexStep={1}
            handleDocumentoChange={handleDocumentoChange}
            handleSubmit={handleSubmit}
            handleModalClose={handleModalClose}
            isButtonDisabled={isButtonDisabled}
            setStepperStep={setStepperStep}
            createWasher={createWasher}
            handleChangeCreateWasher={handleChangeCreateWasher}
            editWasher={editWasher}
          />
          : <ModalWasher2
            indexStep={2}
            handleDocumentoChange={handleDocumentoChange}
            handleSubmit={handleSubmit}
            handleModalClose={handleModalClose}
            isButtonDisabled={isButtonDisabled}
            setStepperStep={setStepperStep}
            createWasher={createWasher}
            handleChangeCreateWasher={handleChangeCreateWasher}
            isButtonDisabledWasher2={isButtonDisabledWasher2}
            loading={loading}
            editWasher={editWasher}
          />
      }
    </>
  );
};

export default ModalAddWasherr;
