import * as React from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeading } from '../src';
import { Button } from '../../button/src';

const metadata = { title: 'Overlays/Modal' };
export default metadata;

export const Example = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const ctaRef = React.useRef(null);
    const handleOpen = () => setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal isOpen={isOpen} onDismiss={handleClose}>
                <ModalContent>
                    <div className="u-bg-toothpaste rounded-8 pt-64 pb-32 mb-8" />
                    <ModalHeading className="mt-16">
                        Title of the content goes here
                    </ModalHeading>
                    <p>
                        Content information goes here. Optional illustration on
                        top. Can contain links.
                    </p>
                    <a href="#" onClick={(event) => event.preventDefault()}>
                        Optional link to read more.
                    </a>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={handleClose}
                        ref={ctaRef}
                    >
                        Accept
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export const Overflowing = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const ctaRef = React.useRef(null);
    const handleOpen = () => setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal isOpen={isOpen} onDismiss={handleClose}>
                <ModalContent>
                    <div className="u-bg-toothpaste rounded-8 pt-64 pb-32 mb-8" />
                    <ModalHeading className="mt-16">
                        Title of the content goes here
                    </ModalHeading>

                    {Array.from(new Array(10), (val, index) => (
                        <p key={index}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    ))}
                </ModalContent>
                <ModalFooter>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={handleClose}
                        ref={ctaRef}
                    >
                        Accept
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
