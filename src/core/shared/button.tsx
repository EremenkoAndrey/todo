import React from 'react';

export const Button = (props: {
    onClick: () => void,
    children: string
}) => (
    <button
        onClick={props.onClick}
        className="py-2 px-8 rounded-md bg-gray-200 hover:bg-gray-500 hover:text-white ease-in duration-75"
    >
        {props.children}
    </button>
);
