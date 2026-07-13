export default function SearchLoading() {
  return (
    <main className="search-page" aria-busy="true">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Keresés</p>
          <h1>Keresés a kiadványban</h1>
          <p className="archive-intro">A keresőfelület betöltése folyamatban van.</p>
        </div>

        <div className="archive-header-meta">
          <span>Találatok betöltése</span>
          <span className="archive-reset-link">Keresés visszaállítása</span>
        </div>
      </header>

      <section className="archive-toolbar" aria-label="Keresőmező">
        <div className="search-form">
          <label className="search-field">
            <span>Keresési kifejezés</span>
            <input disabled placeholder="Szentírás, sorozat, szerző, forrás..." type="search" />
          </label>

          <button disabled type="button">
            Keresés
          </button>
        </div>

        <p className="archive-summary">Szerkesztőségi találatok betöltése.</p>
      </section>

      <section className="archive-grid" aria-label="Keresési találatok">
        {Array.from({ length: 4 }).map((_, index) => (
          <article className="archive-item" key={index}>
            <p className="card-meta">
              <span>Betöltés</span>
              <span>Szerkesztőség</span>
            </p>
            <h2>Találat betöltése</h2>
            <p>A keresési egyezések előkészítése folyamatban van.</p>
          </article>
        ))}
      </section>
    </main>
  )
}
