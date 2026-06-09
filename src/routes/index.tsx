import { useEffect, useState } from "react";
import heroBible from "@/assets/hero-bible.jpg";
import seriesManuscript from "@/assets/series-manuscript.jpg";
import seriesChurch from "@/assets/series-church.jpg";
import seriesParliament from "@/assets/series-parliament.jpg";

const recentPosts = [
  {
    category: "Esszé",
    title: "Az evangélium nem csak kezdet, hanem otthon",
    excerpt:
      "Miért kell újra és újra Krisztusból indulnunk, nem a saját teljesítményünkből?",
    author: "Nagy Bence",
    date: "jún. 5.",
  },
  {
    category: "Gyülekezet",
    title: "Miért több a gyülekezeti tagság egy vasárnapi jelenlétnél?",
    excerpt:
      "A helyi közösség Isten egyik legkézzelfoghatóbb ajándéka a tanítványságban.",
    author: "Farkas Márton",
    date: "jún. 3.",
  },
  {
    category: "Keresztény élet",
    title: "Hűség a hétfő reggeli feladatokban",
    excerpt:
      "A munka nem ellensége a lelki életnek, hanem hely, ahol a hit láthatóvá válik.",
    author: "Tóth Eszter",
    date: "jún. 1.",
  },
  {
    category: "Kultúra",
    title: "Mielőtt az AI-ra kérdeznénk, olvassuk el a Prédikátort",
    excerpt:
      "A technológia gyors választ ígér, a bölcsesség viszont jó kérdésekre tanít.",
    author: "Varga Dániel",
    date: "máj. 30.",
  },
];

const series = [
  {
    image: seriesManuscript,
    title: "Az evangélium alapjai",
    meta: "8 rész • alapozó",
    alt: "Régi kéziratok és töltőtoll egy faasztalon",
  },
  {
    image: seriesChurch,
    title: "Egészséges gyülekezet",
    meta: "7 rész • gyülekezeti",
    alt: "Csendes templombelső padsorokkal és meleg fénnyel",
  },
  {
    image: seriesParliament,
    title: "Hit a közéletben",
    meta: "6 rész • gondolkodó",
    alt: "Közéleti épület esős ablakon át, jegyzetfüzettel",
  },
];

const navLinks = ["Cikkek", "Témák", "Sorozatok"];
const feedFilters = ["Összes", "Biblia", "Gyülekezet", "Élet", "Kultúra"];
const recommended = [
  { title: "Hogyan olvassuk együtt az Ó- és Újszövetséget?", meta: "Esszé • 5 perc" },
  { title: "A figyelem mint keresztény fegyelem", meta: "Kultúra • 8 perc" },
  { title: "Káté családi asztalnál", meta: "Sorozat • 12 rész" },
];

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }

  element.content = content;
}

export function Index() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.title = "Keskeny Út — Magyar keresztény magazin";
    setMeta(
      "description",
      "Magyar nyelvű keresztény magazin Krisztus középpontjával: cikkek, elmélkedések és sorozatok az evangélium mélyebb megértéséért.",
    );
    setMeta("og:title", "Keskeny Út — Magyar keresztény magazin", true);
    setMeta(
      "og:description",
      "Cikkek, elmélkedések és sorozatok az evangélium mélyebb megértéséért és a hiteles keresztény életért.",
      true,
    );
    setMeta("og:image", heroBible, true);
    setMeta("twitter:image", heroBible);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <a
              href="#top"
              className="font-display text-xl font-extrabold uppercase tracking-tighter"
            >
              Keskeny Út
            </a>
            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
              Keresés
            </span>
            <span className="hidden h-px w-32 bg-border lg:block" />
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase transition-colors hover:bg-foreground hover:text-background"
              aria-pressed={isDark}
            >
              {isDark ? "Sötét" : "Világos"}
            </button>
          </div>
        </div>
      </nav>

      <main id="top" className="mx-auto max-w-7xl px-6 py-12">
        <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0">
          <article className="animate-fade-up lg:col-span-8 lg:pr-12">
            <div className="mb-8 flex items-center gap-3">
              <span className="bg-primary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-foreground">
                Kiemelt
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Esszé • 2026. jún. 06.
              </span>
            </div>

            <h1 className="text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
              A keskeny út nem magányos út
            </h1>

            <p className="mt-8 max-w-2xl text-pretty text-xl italic leading-relaxed text-muted-foreground">
              Krisztus követése nem menekülés a világból, hanem hűséges jelenlét
              Isten népe között, az evangélium világosságában.
            </p>

            <div className="mt-10 overflow-hidden rounded-sm">
              <img
                src={heroBible}
                alt="Nyitott Biblia faasztalon, reggeli fényben"
                width="1680"
                height="945"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-foreground font-display text-sm font-extrabold text-background">
                  KÚ
                </span>
                <span className="text-sm text-foreground/80">Keskeny Út szerkesztőség</span>
              </div>
              <a
                href="#cikkek"
                className="group font-mono text-[11px] uppercase tracking-wider text-primary"
              >
                Olvasás{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </article>

          <div className="hidden border-l border-border animate-reveal-down lg:col-span-1 lg:block" />

          <aside className="animate-fade-up [animation-delay:200ms] lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
              Mai elmélkedés
            </p>
            <blockquote className="mt-6 text-2xl font-medium leading-tight">
              „Lábam előtt mécses a te igéd, ösvényem világossága.”
            </blockquote>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Zsoltárok 119,105
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Az ige nem csak nagy döntésekhez ad irányt. A hétköznapi
              engedelmesség apró lépéseiben is világít.
            </p>

            <div className="mt-12 border-t border-border pt-12">
              <h2 className="font-serif text-2xl">Ajánlott</h2>
              <div className="mt-6 space-y-7">
                {recommended.map((item) => (
                  <a key={item.title} href="#cikkek" className="block group">
                    <span className="text-lg leading-snug transition-colors group-hover:text-primary">
                      {item.title}
                    </span>
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {item.meta}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section id="cikkek" className="mt-32">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="font-serif text-3xl">Legutóbbi</h2>
            <div className="flex flex-wrap gap-5">
              {feedFilters.map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={`border-b pb-2 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    index === 0
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-primary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-16">
            {recentPosts.map((post, index) => (
              <article key={post.title} className="group">
                <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                  {post.category}
                </p>
                <h3 className="mt-4 max-w-4xl font-serif text-2xl leading-tight transition-colors group-hover:text-primary md:text-4xl">
                  {post.title}
                </h3>
                <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span className="text-foreground/70">{post.author}</span>
                  <span className="px-2">•</span>
                  {post.date}
                </p>
                {index < recentPosts.length - 1 && <div className="mt-16 h-px bg-border" />}
              </article>
            ))}
          </div>
        </section>

        <section id="sorozatok" className="mt-32 space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="font-display text-4xl font-extrabold tracking-tighter">
              Sorozatok
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {series.map((item) => (
              <a
                key={item.title}
                href="#sorozatok"
                className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-sm bg-foreground/5 p-8"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  width="1024"
                  height="1536"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="relative">
                  <h3 className="font-display text-2xl font-extrabold">{item.title}</h3>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {item.meta}
                  </p>
                  <p className="mt-8 font-mono text-[10px] uppercase tracking-wider text-primary">
                    Megnyitás{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-32 rounded-sm border border-border bg-foreground/[0.02] p-12 text-center md:p-20">
          <h2 className="font-serif text-4xl italic">Hírlevél</h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Hetente egyszer küldünk válogatást friss cikkeinkből,
            elmélkedéseinkből és sorozatainkból.
          </p>
          <form
            className="mx-auto mt-10 flex max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email cím
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="email@pelda.hu"
              className="min-w-0 flex-1 border border-border bg-background px-6 py-4 font-mono text-sm outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              className="bg-foreground px-6 py-4 font-display text-sm font-extrabold uppercase tracking-widest text-background transition-colors hover:bg-primary"
            >
              Feliratkozás
            </button>
          </form>
        </section>
      </main>

      <footer className="mt-32 border-t border-border bg-foreground py-20 text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-extrabold uppercase tracking-tighter">
              Keskeny Út
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-background/70">
              Magyar keresztény magazin az evangélium mélyebb megértéséért,
              a gyülekezeti hűségért és a hiteles hétköznapi tanítványságért.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-wider text-primary">
              Linkek
            </h2>
            <div className="mt-5 space-y-3 text-background/70">
              {["Impresszum", "Adatkezelés", "Archívum"].map((link) => (
                <a key={link} href="#top" className="block transition-colors hover:text-primary">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-wider text-primary">
              Kövessen minket
            </h2>
            <div className="mt-5 space-y-3 text-background/70">
              {["Facebook", "Instagram", "YouTube", "RSS"].map((link) => (
                <a key={link} href="#top" className="block transition-colors hover:text-primary">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between gap-3 border-t border-background/10 px-6 pt-8 font-mono text-[10px] uppercase tracking-wider text-background/60 md:flex-row">
          <span>© 2026 Keskeny Út</span>
          <span>Készült Budapesten</span>
        </div>
      </footer>
    </div>
  );
}
