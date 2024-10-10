import React, { ReactNode } from 'react'
import toast, { ToastOptions } from 'react-hot-toast';
import { IoIosCheckmarkCircle, IoMdClose } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";
import { Button, HStack, Text } from '@chakra-ui/react';

type Props = {
    message: string
    type: ToastType
    retry?: boolean
}

type ToastType = 'success' | 'error';
const icons: Record<ToastType, ReactNode> = {
    success: <IoIosCheckmarkCircle style={{ fontSize: "24px" }} />,
    error: <RiErrorWarningFill style={{ fontSize: "24px" }} />,
};

const styles: Record<ToastType, React.CSSProperties> = {
    success: {
        background: '#4CAF50',
        color: '#fff',
    },
    error: {
        background: '#E53E3E',
        color: '#fff',
    },
};

const Toast = ({
    message,
    type,
    retry // para cuando se haga el reintento
}: Props) => {
    const toastId = toast[type](
        <HStack justify="space-between" align="center" w="100%">
            <Text>{message}</Text>
            {retry
                ?
                <Button
                    size="sm"
                    color={styles[type].color}
                    /* onClick={retry} */
                    variant="ghost"
                    _hover='none'
                    _active='none'
                >
                    Reintentar
                </Button>
                :
                <Button
                    size="sm"
                    variant="ghost"
                    color={styles[type].color}
                    onClick={() => toast.dismiss(toastId)}
                    _hover='none'
                    _active='none'
                >
                    <IoMdClose />
                </Button>
            }
        </HStack >,
        {
            icon: icons[type],
            style: styles[type],
        } as ToastOptions
    );


};

export default Toast