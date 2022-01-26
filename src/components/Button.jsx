import React from "react";
import styled, { css } from "styled-components";
import Tooltip from "@mui/material/Tooltip";

export const BaseButton = ({
  className,
  value,
  disabled,
  children,
  onClick,
  title,
  ...rest
}) => {

    return title ? (
            <Tooltip placement="top" title={title}>
                <button
                className={className}
                onClick={(e) => onClick(e, value)}
                disabled={disabled}
                {...rest}
                >
                {children}
                </button>
            </Tooltip>
        )
        : (
        <button
            className={className}
            onClick={(e) => onClick(e, value)}
            disabled={disabled}
            {...rest}
            >
            {children}
        </button>
  );
};

const boxShadowSize = "0 0 0 0.2rem";

const successVariant = css`
  color: white;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  background-color: #5ebfb2;
  border-color: black;

  border-left-color: ${(props) => props.borderleftcolor};
  border-left-style: ${(props) => props.borderleftstyle};
  border-width: ${(props) => props.borderwidth};

  margin: ${(props) => props.margin};
  :hover:enabled {
    background-color: #14b29e;
  }
  :focus {
    box-shadow: ${boxShadowSize} rgba(72, 180, 97, 0.5);
  }
`;

const transparentVariant = css`
  cursor: ${(props) => props.cursor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: transparent;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  :hover:enabled {
    background-color: greyAdobe1;
  }
`;

const defaultVariant = css`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  padding: ${(props) => props.padding};
  background-color: transparent;
  margin: ${(props) => props.margin};
  :hover:enabled {
    background-color: #ccc;
  }
  &:focus {
    outline: 0;
    border-color: #80bdff;
  }
`;

const getButtonVariant = (variant) => {
  switch (variant) {
    case "success":
      return successVariant;
    case "transparent":
      return transparentVariant;
    default:
      return defaultVariant;
  }
};

const baseButtonStyles = css`
  width: 10rem;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  margin: 0px 10px;
  transition: background-color 0.3s;
  justify-content: center;
  align-items: center;
  display: inline-block;
  font-size: 1.1rem;
  height: 55px;
  ${(props) => getButtonVariant(props.variant)};
  svg {
    vertical-align: middle;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Button = styled(BaseButton)`
  ${baseButtonStyles}
`;

export default Button;
