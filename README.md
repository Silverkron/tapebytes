# TapeBytes

Applicazione statica, interamente client-side, per registrare file su cassette e recuperarli. HTML indipendenti in inglese, italiano, spagnolo, tedesco e francese; nessun backend o account richiesto.

## Struttura

- `src/`: interfaccia, traduzioni, audio, codec e acquisizione.
- `build.mjs`: genera 25 pagine statiche, sitemap, metadati e risorse in `dist/`.
- `tests/`: test del codec, acquisizione e sito.
- `.github/workflows/static-pages.yml`: genera il sito su `gh-pages` e consente la pubblicazione manuale.
- `outputs/`, `work/`: esportazioni e ricerca locali, escluse da Git.

La cronologia Git precedente è stata mantenuta. Non sono configurati remoti GitHub.

## Sviluppo locale

Richiede Node.js 22+ e Python 3 per il server. Nessuna dipendenza npm da installare.

```sh
npm run build
npm test
npm run dev
```

Apri http://127.0.0.1:8765/ oppure `/it/`. Le pagine si aprono direttamente anche senza passare dalla home. Per l’acquisizione audio servono localhost o HTTPS.

Per il file HTML portatile: esegui prima la build con `BASE_PATH` vuoto, poi `npm run portable`. Il risultato è `outputs/TapeBytes.html`.

## Caricamento su GitHub

Crea un repository vuoto e aggiungi il suo indirizzo come `origin`, poi carica il branch `main`. Prima del commit, controlla `git status`: `outputs/`, `work/`, `dist/`, `.openai/` e i file di credenziali sono esclusi. Le rimozioni di `dist/` dall’indice sono intenzionali: ora viene generato dalla Action.

```sh
git add .
git commit -m "Prepare static GitHub Pages workflow"
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

Ogni push su `main` genera e verifica le pagine, aggiorna `gh-pages` con **solo il contenuto statico** e carica un artifact scaricabile. Non modifica il branch sorgente e non pubblica automaticamente. Il workflow usa il `GITHUB_TOKEN` del repository, senza PAT. Il branch `gh-pages` è riservato all’output generato: non modificarlo a mano. Le regole di protezione devono consentirne l’aggiornamento alla Action.

### Attivare GitHub Pages

1. In **Settings → Pages → Build and deployment**, scegli **GitHub Actions**.
2. In **Actions → Build static site → Run workflow**, scegli `main` e abilita **Publish the generated site to GitHub Pages**.
3. Il job pubblica lo stesso artifact generato e salvato sul branch `gh-pages`.

Si usa la pubblicazione esplicita tramite Actions perché i commit su `gh-pages` effettuati con `GITHUB_TOKEN` non avviano da soli la pubblicazione Pages da branch. Non occorre cambiare i token. Documentazione: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

### Indirizzo e SEO

Il sito usa `https://tapebytes.lucasciacca.com`, configurato in `site.config.json`, senza prefisso. Il workflow usa la stessa configurazione. Canonical, hreflang, sitemap e anteprime social seguono questo indirizzo. La build genera anche `CNAME`.

Variabili facoltative in **Settings → Secrets and variables → Actions → Variables**:

| Variabile | Uso |
| --- | --- |
| `SITE_ORIGIN` | Origine HTTPS senza percorso, per esempio `https://example.com`. |
| `BASE_PATH` | Prefisso, per esempio `/tape-vault`; usa `/` per un dominio alla radice. |
| `INDEXABLE` | Imposta `1` quando vuoi permettere l’indicizzazione. Di default `0`. |

Per un dominio personalizzato, configura anche dominio e DNS nelle impostazioni Pages. La build mantiene `noindex` finché `INDEXABLE` non viene impostato a `1`. Al lancio configura il DNS del sottodominio, il dominio personalizzato in Pages e questa variabile; quindi esegui la pubblicazione manuale. Nessuna pubblicazione viene avviata dalla sola modifica dei testi.

Esempio di build per un repository:

```sh
SITE_ORIGIN=https://owner.github.io BASE_PATH=/tape-vault INDEXABLE=1 npm run build
npm test
```

## Audio e sicurezza

Il riferimento stereo è attivo di default: dati a sinistra, riferimento a destra. Il volume parte dal 100% ed è regolabile. Playback in ingresso è spento di default. Conserva i file originali finché il recupero non supera CRC e SHA-256.

## Linea editoriale

TapeBytes è un progetto gratuito per appassionati di retrocomputing e registrazione analogica. Tono preciso, accessibile e appassionato: descrivere operazioni reali, senza promesse di archiviazione affidabile su qualsiasi hardware. Intento principale: cassette data storage. La guida risponde a capacità, attrezzatura e compatibilità; Codifica offre la stima effettiva. Nessuna compatibilità implicita con formati storici.

Titoli specifici e descrittivi e lingue con URL distinti seguono le indicazioni Google: https://developers.google.com/search/docs/appearance/title-link e https://developers.google.com/search/docs/specialty/international/localized-versions .

Le cinque voci includono il dominio selezionato. Per rigenerarle su macOS: `python3 scripts/generate-voices.py` (richiede le voci di sistema e ffmpeg). Il formato audio e gli identificatori TVBLK003/TVFSK001/002 restano invariati per leggere le registrazioni precedenti.
# tapebytes
