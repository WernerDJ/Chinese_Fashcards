# 漢字 Flashcards

A web-based Chinese flashcard app connected to a Google Sheet as its database. Supports two study modes (中文 → Español and Español → 中文), pinyin display, text-to-speech, swipe gestures for mobile, and tracks which words you have learned.

---

## Requirements

- A Google account
- A GitHub account
- A Vercel account (free)
- Google Chrome (recommended for text-to-speech support)

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it whatever you like (e.g. `Flashcards`).
3. The Apps Script (Step 2) will automatically create a tab called **Flashcards** with the correct columns the first time it runs. You do not need to create the columns manually.
4. Once the tab is created, fill in your words directly in the sheet. The columns are:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Chino | Pinyin | Español | Frase_Chino | Frase_Pinyin | Frase_Español | Aprendido |

- **Chino** — the Chinese character(s), e.g. `你好`
- **Pinyin** — the romanized pronunciation, e.g. `nǐ hǎo`
- **Español** — the Spanish translation, e.g. `Hola`
- **Frase_Chino** — an example sentence in Chinese, e.g. `你好，你叫什么名字？`
- **Frase_Pinyin** — the pinyin of the example sentence
- **Frase_Español** — the Spanish translation of the example sentence
- **Aprendido** — leave as `FALSE`; the app updates this automatically when you mark a card as learned

---

## Step 2 — Set up the Apps Script

The Apps Script acts as the bridge between the web page and your Google Sheet.

1. In your Google Sheet, click **Extensions → Apps Script**.
2. Delete all existing code in the editor.
3. Paste the entire contents of `flashcards-Code-v2.gs` (included in this repository).
4. Click the 💾 **Save** button (or press `Ctrl+S`).

### Deploy the script as a Web App

5. Click **Deploy → New deployment**.
6. Click the ⚙️ gear icon next to "Select type" and choose **Web app**.
7. Fill in the settings:
   - **Description**: anything, e.g. `Flashcards API`
   - **Execute as**: Me
   - **Who has access**: Anyone
8. Click **Deploy**.
9. Google will ask you to authorize the app. Click **Advanced → Go to [project name] (unsafe)** → **Allow**. This is safe — it is your own script accessing your own sheet.
10. After deploying, copy the **Web App URL**. It looks like:
    ```
    https://script.google.com/macros/s/AKfycb.../exec
    ```
    Keep this URL — you will need it in Step 3.

### Updating the script after changes

If you ever need to update the Apps Script code, after saving the new code you must create a new deployment version for changes to take effect:

1. Click **Deploy → Manage deployments**.
2. Click the ✏️ pencil icon.
3. Change the version to **New version**.
4. Click **Deploy**.

---

## Step 3 — Configure the HTML file

Open `index.html` in any text editor and find this line near the top of the `<script>` section:

```javascript
// ── CONFIG ────────────────────────────────────────────────
const SCRIPT_URL = 'PASTE_YOUR_SCRIPT_URL_HERE';
```

Replace `PASTE_YOUR_SCRIPT_URL_HERE` with the Web App URL you copied in Step 2, keeping the single quotes. For example:

```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
```

Save the file.

---

## Step 4 — Deploy to Vercel

1. Go to [github.com](https://github.com) and create a new repository. It can be **private**.
2. Upload `index.html` and `flashcards-Code-v2.gs` to the repository using **Add file → Upload files**.
3. Go to [vercel.com](https://vercel.com) and create a free account.
4. Click **Add New → Project** and import your GitHub repository.
5. Leave all build settings blank — Vercel will detect it as a static site automatically.
6. Click **Deploy**.

Vercel will give you a public URL like `https://your-project-name.vercel.app`. Share this URL with anyone you want to use the app.

### Redeploying after changes

Because Vercel is connected to your GitHub repository, redeployment is automatic. Whenever you update `index.html` in GitHub (by editing it or uploading a new version), Vercel detects the change and redeploys the site within about 30 seconds. No manual action needed.

---

## How to use the app

- **Choose a mode** — 中文 → Español shows the Chinese character first; Español → 中文 shows the Spanish word first.
- **Tap or click the card** to flip it and reveal the translation.
- **Swipe left** to go to the next card (mobile).
- **Swipe right** to go to the previous card (mobile).
- **Mostrar Pinyin** — shows the pinyin for the word and the example sentence.
- **Escuchar palabra** — reads the Chinese word aloud (requires Chrome for best results).
- **Escuchar frase** — reads the Chinese example sentence aloud.
- **Aprendido checkbox** — marks the word as learned and saves it to the Google Sheet instantly.
- **Solo pendientes toggle** — filters the deck to show only cards not yet marked as learned.
- **Aleatorio toggle** — shuffles the deck randomly; when off, cards follow the sheet order.
- **Reiniciar todos los aprendidos** — resets all Aprendido values to FALSE in the sheet, so you can start a new round of memorization.

---

## Notes

- Text-to-speech works best in **Google Chrome** on desktop and mobile. Firefox on Linux does not include Chinese voices by default.
- The Google Sheet is the single source of truth. You can add, edit, or remove words directly in the sheet at any time — changes will appear the next time the app is loaded.
- The Apps Script URL is embedded in the HTML. Since the repository is private, this URL is not publicly visible.
