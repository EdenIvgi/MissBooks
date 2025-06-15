export function AppHeader({ onSetPage }) {
    return (
      <header className="app-header">
        <h1>📚 Miss Books</h1>
        <nav>
          <button onClick={() => onSetPage('home')}>Home</button>
          <button onClick={() => onSetPage('about')}>About Us</button>
          <button onClick={() => onSetPage('book')}>Books</button>
        </nav>
      </header>
    )
  }
  