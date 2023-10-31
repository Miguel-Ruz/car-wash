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
    washType: string;
    rate: string;
    paymentType: string;
  };
  listWasher: any;
  isButtonDisabled: boolean;
  handleSubmitCreateWashe: () => void;
  loading: boolean;
  isButtonDisabledWashData: boolean;
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

  loading,
  isButtonDisabledWashData,
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
        />
      )}
    </>
  );
};

export default ModalAddWash;
