'use client';
import styles from './page.module.css';
import { HomeMessage } from '@acme/feature-home';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HomeMessage />
      </main>
    </div>
  );
}
