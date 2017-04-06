import React from 'react';

const App = () => {
    return (
        <div>
            <h1>헬로 리액트!!</h1>
            <div>{process.env.NODE_ENV}</div>
        </div>
        
    )
}
export default App;