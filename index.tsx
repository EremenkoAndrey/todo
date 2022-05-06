import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return (
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    );
}

ReactDOM.render(
    <App />,
    window.document.getElementById('root')
);
