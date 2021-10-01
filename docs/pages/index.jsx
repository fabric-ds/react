import React from 'react';

export default function Index() {
    return (
        <>
            <div className="grid lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <h1>Fabric React</h1>

                    <p>Home to the React implementation of <a href="https://www.fabric-ds.io/">Fabric</a>, FINN's design system.</p>
                </div>
                <div>
                    <f-docs-highlight-box></f-docs-highlight-box>
                </div>
            </div>
        </>
    )
}
