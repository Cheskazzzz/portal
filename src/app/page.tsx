import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.hero}>
        <section className={styles.left}>
          <div className={styles.numbers}>
            <div className={styles.top}>01</div>
            <div className={styles.vertical}></div>
            <div className={styles.bottom}>09</div>
          </div>

          <h1 className={styles.title}>
            Building
            <br />
            Construction
          </h1>

          <p className={styles.lead}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </section>

        <aside className={styles.right}>
          <div className={styles.imgWrap}>
            <div
              className={styles.skew1}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1505842465776-3d3f5f6f9fab?auto=format&fit=crop&w=1400&q=80')",
              }}
            />

            <div
              className={styles.skew2}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1533105070126-6111d5d6f3a6?auto=format&fit=crop&w=1400&q=80')",
              }}
            />
          </div>
        </aside>
      </main>

      <div className={styles['footer-accent']} />
    </div>
  );
}
