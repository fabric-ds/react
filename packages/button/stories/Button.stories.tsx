import React, { useState } from 'react';
import { Button } from '../src';

const metadata = { title: 'Buttons/Button' };
export default metadata;

export const Example = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="flex flex-col space-y-32">
            <div>
                <h3>Primary</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" primary>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Loading' : 'Make Me Loading'}
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary small>
                    Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary small loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Small Loading' : 'Make Me Loading'}
                </Button>
            </div>
            <div>
                <h3>Secondary</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Loading' : 'Make Me Loading'}
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary quiet>
                    Quiet
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary quiet loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Quiet Loading' : 'Make Me Loading'}
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary small>
                    Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary small loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Small Loading' : 'Make Me Loading'}
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary quiet small>
                    Quiet Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary quiet small loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Quiet Small Loading' : 'Make Me Loading'}
                </Button>
            </div>
            <div>
                <h3>Negative</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" negative primary>
                    Primary
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative primary loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Primary Loading' : 'Make Me Loading'}
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary negative small>
                    Primary Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary negative small loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Primary Small Loading' : 'Make Me Loading'}
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative quiet>
                    Quiet
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative quiet loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Quiet Loading' : 'Make Me Loading'}
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative quiet small>
                    Quiet Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative quiet small loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Quiet Small Loading' : 'Make Me Loading'}
                </Button>
            </div>
            <div>
                <h3>Utility</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" utility>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" utility loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Loading' : 'Make Me Loading'}
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" utility small>
                    Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" utility small loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Small Loading' : 'Make Me Loading'}
                </Button>
            </div>
            <div>
                <h3>Pill</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" pill>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" pill loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Loading' : 'Make Me Loading'}
                </Button>
            </div>
            <div>
                <h3>Link</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" href="http://google.com" link>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" href="http://google.com" link loading={loading} onClick={() => setLoading(!loading)}>
                    {loading ? 'Loading' : 'Make Me Loading'}
                </Button>
            </div>
        </div>
    );
};
