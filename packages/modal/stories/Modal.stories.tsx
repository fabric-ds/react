import * as React from 'react';
import { Modal } from '../src';
import { Button } from '../../button/src';
import { Toggle } from '../../toggle/src';

const metadata = { title: 'Overlays/Modal' };
export default metadata;

export const Example = () => {
    const [open, setOpen] = React.useState(true);
    const toggleModal = () => setOpen(!open);

    return (
        <>
            <Button utility onClick={toggleModal}>
                Open modal
            </Button>
            <Modal
                open={open}
                onDismiss={toggleModal}
                title="Title of the content goes here"
                footer={
                    <>
                        <Button onClick={toggleModal} className="mr-12">
                            Cancel
                        </Button>
                        <Button primary onClick={toggleModal}>
                            Accept
                        </Button>
                    </>
                }
            >
                <p>
                    Content information goes here. Optional illustration on top.
                    Can contain links.
                </p>
                <a href="#" onClick={(event) => event.preventDefault()}>
                    Optional link to read more.
                </a>
            </Modal>
        </>
    );
};

export const WithBackAndCloseButton = () => {
    const [open, setOpen] = React.useState(true);
    const toggleModal = () => setOpen(!open);

    return (
        <>
            <Button utility onClick={toggleModal}>
                Open modal
            </Button>
            <Modal
                open={open}
                left
                right
                onDismiss={toggleModal}
                title="Title of the content goes here"
                footer={
                    <>
                        <Button onClick={toggleModal} className="mr-12">
                            Cancel
                        </Button>
                        <Button primary onClick={toggleModal}>
                            Accept
                        </Button>
                    </>
                }
            >
                <p>
                    Content information goes here. Optional illustration on top.
                    Can contain links.
                </p>
                <a href="#" onClick={(event) => event.preventDefault()}>
                    Optional link to read more.
                </a>
            </Modal>
        </>
    );
};

export const MustConfirmToProceed = () => {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const toggleModal = () => setOpen(!open);
    return (
        <>
            <Button utility onClick={toggleModal}>
                Open modal
            </Button>
            <Modal
                open={open}
                onDismiss={toggleModal}
                title="Do you agree to these terms?"
                footer={
                    <Button primary onClick={toggleModal} disabled={!checked}>
                        Accept
                    </Button>
                }
            >
                <p>1. You must give me 10 pushups right now</p>
                <Toggle type="checkbox" label="I agree" onChange={setChecked} />
            </Modal>
        </>
    );
};

export const InitialFocus = () => {
    const [open, setOpen] = React.useState(false);
    const toggleModal = () => setOpen(!open);

    const focusRef = React.useRef();

    return (
        <>
            <Button utility onClick={toggleModal}>
                Open modal
            </Button>
            <Modal
                open={open}
                onDismiss={toggleModal}
                initialFocusRef={focusRef}
                title="Title of the content goes here"
                footer={
                    <>
                        <Button onClick={toggleModal} className="mr-12">
                            Cancel
                        </Button>
                        <Button ref={focusRef} primary onClick={toggleModal}>
                            Accept
                        </Button>
                    </>
                }
            >
                <p>
                    Content information goes here. Optional illustration on top.
                    Can contain links.
                </p>
                <a href="#" onClick={(event) => event.preventDefault()}>
                    Optional link to read more.
                </a>
            </Modal>
        </>
    );
};

export const Overflowing = () => {
    const [open, setOpen] = React.useState(true);
    const toggleModal = () => setOpen(!open);

    return (
        <>
            <Button utility onClick={toggleModal}>
                Open modal
            </Button>
            <Modal
                open={open}
                onDismiss={toggleModal}
                title="Title of the content goes here"
                footer={
                    <>
                        <Button onClick={toggleModal} className="mr-12">
                            Cancel
                        </Button>
                        <Button primary onClick={toggleModal}>
                            Accept
                        </Button>
                    </>
                }
            >
                {[...new Array(10)].map((e, i) => (
                    <p key={i}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                ))}
            </Modal>
        </>
    );
};
