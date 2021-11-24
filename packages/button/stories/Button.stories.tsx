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
        <Button className="mr-32" primary href="https://google.com">
          Simple href
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
        <Button className="mr-32" secondary href="https://google.com">
          Simple href
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
        <Button className="mr-32" negative>
          Primary
        </Button>
        <Button className="mr-32" negative href="https://google.com">
          Simple href
        </Button>
        {/* @ts-ignore */}
        <Button className="mr-32" negative loading>
          Primary Loading
        </Button>
        {/* @ts-ignore */}
        <Button className="mr-32" negative small>
          Primary Small
        </Button>
        {/* @ts-ignore */}
        <Button className="mr-32" negative small loading>
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
        <Button className="mr-32" utility href="https://google.com">
          Simple href
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
        <Button className="mr-32" link>
          Simple
        </Button>
        {/* @ts-ignore */}
        <Button className="mr-32" link small>
          Loading
        </Button>
      </div>
      <div>
        <h3>Link (href)</h3>
        {/* @ts-ignore */}
        <Button
          link
          className="mr-32"
          href="https://google.com/"
          target="_blank"
        >
          Simple
        </Button>
      </div>
    </div>
  );
};
