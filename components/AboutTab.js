export default function AboutTab() {
  return (
    <section>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>About Akhilesh Appala</h3>
        <p>
          Software engineer at <strong>Arista Networks</strong>, on the MSS team under Cloud —
          building depth in cloud, networking and AI, and teaching what he learns as he goes.
        </p>
        <p>
          Off the clock: league cricketer in Liberty Hill / Austin, Texas — Austin Titans
          (leather ball) and Rippers (tape ball), wicket keeper-batsman, jersey 59 — and the
          creator behind two YouTube channels: <strong>DevHacks-Akhi</strong> (career and
          engineering courses, home of the FDE Full Course) and <strong>SSAkhi</strong> (his
          cricket comeback, documented innings by innings).
        </p>
        <p className="muted">
          Akhi&apos;s Lab is his one home for preparation: the FDE course, system design
          concepts, interview prep, and the projects that prove it — one concept, one example,
          one assignment at a time.
        </p>
        <div className="chips" style={{ marginTop: 14 }}>
          <a className="chip" href="https://github.com/akhileshappala" target="_blank" rel="noreferrer">GitHub — akhileshappala</a>
          <a className="chip" href="https://www.youtube.com/@DevHacks-Akhi" target="_blank" rel="noreferrer">YouTube — DevHacks-Akhi</a>
          <a className="chip" href="https://www.youtube.com/@ssakhilesh59" target="_blank" rel="noreferrer">YouTube — SSAkhi</a>
        </div>
      </div>
    </section>
  );
}
