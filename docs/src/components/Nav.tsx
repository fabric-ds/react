import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
    return (
        <nav className="py-20 px-16 link link--dark bg-bluegray-100 relative nav-width md:px-32 h-full md:fixed">
            <Link
                to="/"
                className="block link link--dark link--block u-t3 py-4 px-10 mb-32"
            >
                Fabric React
            </Link>

            <div className="flex flex-col space-y-20">
                <NavCategory title="Guide">
                    <StyledLink to="/getting-started">
                        Getting started
                    </StyledLink>
                </NavCategory>

                <NavCategory title="Buttons">
                    <StyledLink to="/button">Button</StyledLink>
                </NavCategory>

                <NavCategory title="Forms">
                    <StyledLink to="/checkbox">Checkbox</StyledLink>
                    <StyledLink to="/switch">Switch</StyledLink>
                    <StyledLink to="/checkboxgroup">CheckboxGroup</StyledLink>
                    <StyledLink to="/combobox">Combobox</StyledLink>
                    <StyledLink to="/radiogroup">RadioGroup</StyledLink>
                    <StyledLink to="/select">Select</StyledLink>
                    <StyledLink to="/textfield">TextField</StyledLink>
                    <StyledLink to="/textarea">TextArea</StyledLink>
                    <StyledLink to="/slider">Slider</StyledLink>
                </NavCategory>

                <NavCategory title="Navigation">
                    <StyledLink to="/breadcrumbs">Breadcrumbs</StyledLink>
                    <StyledLink to="/tabs">Tabs</StyledLink>
                </NavCategory>

                <NavCategory title="Overlays">
                    <StyledLink to="/modal">Modal</StyledLink>
                </NavCategory>

                <NavCategory title="Layout">
                    <StyledLink to="/box">Box</StyledLink>
                    <StyledLink to="/expandable">Expandable</StyledLink>
                </NavCategory>
            </div>
        </nav>
    );
}

const NavCategory = ({ title, children }) => (
    <div>
        <h2 className="u-d1 u-stone uppercase pl-10">{title}</h2>
        <div className="flex flex-col space-y-4">{children}</div>
    </div>
);

const StyledLink = (props) => (
    <NavLink
        {...props}
        activeClassName="bg-bluegray-300"
        className="link link--dark link--block px-10 py-6 rounded-4 hover:bg-bluegray-300 md:py-4 "
    />
);
