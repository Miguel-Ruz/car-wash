import React from "react";


//fetch
import postWasher from "../../../services/postWashers";
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
    ciudad: string,
    departamento: string

  }
  isButtonDisabledWasher2: boolean
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
  isButtonDisabledWasher2
}: Props) => {
  const handleDocumentoChange = (e: any) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      handleChangeCreateWasher(value);
      setError(true); // Borra el mensaje de error si es válido
    } else {
      setError(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Valida que los campos "name" y "documento" tengan valores antes de enviar la solicitud
    if (createWasher.name.trim() === "" || createWasher.documento.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return; // Detén el envío de la solicitud si hay campos vacíos
    }

    const dataToSend = {
      name,
      documentId: createWasher.documento,
    };

    //fetch
    const data = postWasher(dataToSend);

    //cerrar modal y recargar la pagina
    if (data) {
      handleModalClose();
      window.location.reload();
    }
  };

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
          />
      }
    </>
  );
};

export default ModalAddWasherr;
