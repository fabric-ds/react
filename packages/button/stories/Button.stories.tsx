import * as React from 'react';
import { Button } from '../src';

const metadata = { title: 'Buttons/Button' };
export default metadata;

export const Example = () => {
    return (
        <div className="flex flex-col space-y-32">
            <div>
                <h3>Primary</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" primary>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary loading>
                    Loading
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary small>
                    Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary small loading>
                    Small Loading
                </Button>
            </div>
            <div>
                <h3>Secondary</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary loading>
                    Loading
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary quiet>
                    Quiet
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary quiet loading>
                    Quiet Loading
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary small>
                    Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary small loading>
                    Small Loading
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary quiet small>
                    Quiet Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" secondary quiet small loading>
                    Quiet Small Loading
                </Button>
            </div>
            <div>
                <h3>Negative</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" negative primary>
                    Primary
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative primary loading>
                    Primary Loading
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary negative small>
                    Primary Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" primary negative small loading>
                    Primary Small Loading
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative quiet>
                    Quiet
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative quiet loading>
                    Quiet Loading
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative quiet small>
                    Quiet Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" negative quiet small loading>
                    Quiet Small Loading
                </Button>
            </div>
            <div>
                <h3>Utility</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" utility>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" utility loading>
                    Loading
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" utility small>
                    Small
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" utility small loading>
                    Small Loading
                </Button>
            </div>
            <div>
                <h3>Pill</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" pill>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" pill loading>
                    Loading
                </Button>
            </div>
            <div>
                <h3>Link</h3>
                {/* @ts-ignore */}
                <Button className="mr-32" href="http://google.com" link>
                    Simple
                </Button>
                {/* @ts-ignore */}
                <Button className="mr-32" href="http://google.com" link small>
                    Loading
                </Button>
            </div>
        </div>
    );
};
