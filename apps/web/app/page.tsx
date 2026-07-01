import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>AREID 🧠🔋</h1>
          <p>Autonomous Resilient Economic Intelligence Dispatcher</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Tactical Overview</h2>
            <p>Real-time Quota Heatmap and model health metrics.</p>
            <span className={styles.status}>Incoming...</span>
          </div>

          <div className={styles.card}>
            <h2>Economic Yield</h2>
            <p>Historical "Ghost Savings" and efficiency analytics.</p>
            <span className={styles.status}>Incoming...</span>
          </div>

          <div className={styles.card}>
            <h2>Fleet Management</h2>
            <p>Manage Identity Clusters and provider rotations.</p>
            <span className={styles.status}>Incoming...</span>
          </div>

          <div className={styles.card}>
            <h2>Semantic Vault</h2>
            <p>Explore archived memories and RAG-augmented insights.</p>
            <span className={styles.status}>Incoming...</span>
          </div>
        </div>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://github.com/google-gemini/gemini-cli"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Protocol Docs
          </a>
          <a
            href="http://localhost:8080/v1/health"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Check Hub Health
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2026 AREID Startup - The Guerilla Reasoning Economy</p>
      </footer>
    </div>
  );
}
