import React from 'react';
import './styles/App.css';

const App = () => {
    return (
        <div className="root">
            <header className="box header">
                <h2>Write Post</h2>
                <div>
                    <textarea className="post-text"></textarea>
                </div>
                <div>
                    <button>입력</button>
                </div>
            </header>
            <section className="box">
                <h2>Posts</h2>
            </section>
            <footer className="box">푸터</footer>
        </div>

    )
}
export default App;