import * as React from 'react';
import { Button } from '../src';

const metadata = { title: 'Buttons/Button' };
export default metadata;

const variants = ['primary', 'secondary', 'destructive', 'order', 'utility'];

export const Example = () => {
    return (
        <div className="flex flex-col space-y-32">
            {variants.map((variant) => (
                <div key={variant}>
                    {/* @ts-ignore */}
                    <Button className="mr-32" variant={variant}>
                        Button text
                    </Button>
                    {/* @ts-ignore */}
                    <Button className="mr-32" variant={variant} small>
                        Button text
                    </Button>
                    {/* @ts-ignore */}
                    <Button className="mr-32" variant={variant} disabled>
                        Button text
                    </Button>
                    {/* @ts-ignore */}
                    <Button className="mr-32" variant={variant} inProgress>
                        Button text
                    </Button>
                </div>
            ))}
            <div>
                <Button className="mr-32" flat>
                    Button text
                </Button>
                <Button className="mr-32" flat small>
                    Button text
                </Button>
                <Button className="mr-32" flat disabled>
                    Button text
                </Button>
                <Button className="mr-32" flat inProgress>
                    Button text
                </Button>
            </div>
            <div>
                <Button className="mr-32" variant="destructive" flat>
                    Button text
                </Button>
                <Button className="mr-32" variant="destructive" flat small>
                    Button text
                </Button>
                <Button className="mr-32" variant="destructive" flat disabled>
                    Button text
                </Button>
                <Button className="mr-32" variant="destructive" flat inProgress>
                    Button text
                </Button>
            </div>
        </div>
    );
};
