import React, { useEffect } from 'react'
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/modal";
import Image from 'next/image';

function CustomLoader({ isLoading }: { isLoading: boolean }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (isLoading) {
            onOpen();
        } else {
            onClose();
        }
    }, [isLoading]);

    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
        >
            <ModalContent className='p-10 flex w-full items-center justify-center'>
                <ModalBody>
                    <Image src={'/loader.gif'} alt='loader'
                        width={300} height={300}
                        className='w-[200px] h-[200px]' />
                </ModalBody>
                <h2 className='font-bold text-2xl text-primary text-center font-noto-sans-serif'>
                    জাদুর শহর থেকে গল্প আসছে , অপেক্ষা করুন..
                </h2>
            </ModalContent>
        </Modal>
    );
}

export default CustomLoader;
