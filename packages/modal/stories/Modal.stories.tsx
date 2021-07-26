import * as React from 'react';
import { Modal } from '../src';
import { Button } from '../../button/src';

const metadata = { title: 'Overlays/Modal' };
export default metadata;

export const Example = () => {
    const [open, setOpen] = React.useState(true);
    const toggleModal = () => setOpen(!open);

    return (
        <>
            <Button onClick={toggleModal}>Open modal</Button>
            <Modal
                title="Title of the content goes here"
                open={open}
                onDismiss={toggleModal}
                footer={
                    <>
                        <Button onClick={toggleModal}>Cancel</Button>
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

export const Overflowing = () => {
    const [open, setOpen] = React.useState(true);
    const toggleModal = () => setOpen(!open);

    return (
        <>
            <Button onClick={toggleModal}>Open modal</Button>
            <Modal
                isOpen={open}
                onDismiss={toggleModal}
                title="Title of the content goes here"
                footer={
                    <>
                        <Button onClick={toggleModal}>Cancel</Button>
                        <Button primary onClick={toggleModal}>
                            Accept
                        </Button>
                    </>
                }
            >
                <div className="u-bg-toothpaste rounded-8 pt-64 pb-32 mb-8" />

                {new Array(10).map(_, (i) => (
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
