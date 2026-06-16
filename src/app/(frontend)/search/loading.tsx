export default function SearchLoading() {
  return (
    <main className="search-page" aria-busy="true">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Search</p>
          <h1>Search the publication</h1>
          <p className="archive-intro">Loading search surface.</p>
        </div>

        <div className="archive-header-meta">
          <span>Loading results</span>
          <span className="archive-reset-link">Reset search</span>
        </div>
      </header>

      <section className="archive-toolbar" aria-label="Search input">
        <div className="search-form">
          <label className="search-field">
            <span>Search term</span>
            <input disabled placeholder="Scripture, series, author, resource..." type="search" />
          </label>

          <button disabled type="button">
            Search
          </button>
        </div>

        <p className="archive-summary">Loading editorial matches.</p>
      </section>

      <section className="archive-grid" aria-label="Search results">
        {Array.from({ length: 4 }).map((_, index) => (
          <article className="archive-item" key={index}>
            <p className="card-meta">
              <span>Loading</span>
              <span>Editorial</span>
            </p>
            <h2>Loading result</h2>
            <p>Preparing search matches.</p>
          </article>
        ))}
      </section>
    </main>
  )
}
