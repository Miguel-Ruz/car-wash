import React from "react";

import ClientData from "./ClientData";
import WashData from "./WashData";

type Props = {
  stepperStep: {
    clientData: boolean;
    washData: boolean;
  };
  setStepperStep: (value: { clientData: boolean; washData: boolean }) => void;
  handleModalClose: () => void;
  handleChangeCreateWash: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createWash: {
    washerId: string;
    clientName: string;
    vehicleType: string;
    licensePlate: string;
    washType: string
    rate: string;
    paymentType: string;
  };
  listWasher: any;
  isButtonDisabled: boolean;
  handleSubmitCreateWash: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  isButtonDisabledWashData: boolean;
  listWashType: any;
  selectedWashType: any;
  setSelectedWashType: any;
  editWash: any;
  setCreateWash: any
  setValidation: any
};

const ModalAddWash = ({
  stepperStep,
  setStepperStep,
  handleModalClose,
  handleChangeCreateWash,
  createWash,
  listWasher,
  isButtonDisabled,
  handleSubmitCreateWash,
  listWashType,
  loading,
  isButtonDisabledWashData,
  selectedWashType,
  setSelectedWashType,
  editWash,
  setCreateWash,
  setValidation
}: Props) => {
  const { clientData, washData } = stepperStep;
  return (
    <>
      {clientData ? (
        <ClientData
          indexStep={1}
          setStepperStep={setStepperStep}
          handleModalClose={handleModalClose}
          handleChangeCreateWash={handleChangeCreateWash}
          createWash={createWash}
          isButtonDisabled={isButtonDisabled}
          editWash={editWash}
          setCreateWash={setCreateWash}
          setValidation={setValidation}

        />
      ) : (
        <WashData
          indexStep={2}
          setStepperStep={setStepperStep}
          handleChangeCreateWash={handleChangeCreateWash}
          createWash={createWash}
          listWasher={listWasher}
          handleSubmitCreateWash={handleSubmitCreateWash}
          loading={loading}
          isButtonDisabledWashData={isButtonDisabledWashData}
          listWashType={listWashType}
          selectedWashType={selectedWashType}
          setSelectedWashType={setSelectedWashType}
          editWash={editWash}
          setCreateWash={setCreateWash}
          setValidation={setValidation}
        />
      )}
    </>
  );
};

export default ModalAddWash;
