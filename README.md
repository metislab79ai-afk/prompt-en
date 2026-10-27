# LOGODI · Global AI Learning Lab

## Mobile edition

The mobile-first edition uses a single-column layout, large touch controls, 16px form inputs, sticky progress and bottom step controls, and safe-area spacing. Desktop visitors see the same focused layout in a centered 560px column. `mobile.css` supplies the mobile layout over the base styles. `vibrant.css` adds the navy, violet and mint visual theme. All research, poster, language and store features remain available.

For a 390px local preview, open http://127.0.0.1:4173/scripts/mobile-preview.html while the development server is running. This development-only preview is not copied into the production build.

An English-language workshop website hosted by the **Local Government Officials Development Institute (LOGODI)**. Participants turn public-sector learning challenges into multilingual Gemini Deep Research prompts.

## Run locally

Requires Node.js 20 or later. No dependencies or API keys are needed.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Use a web server rather than opening index.html directly (the application uses JavaScript modules).

```sh
npm test
npm run build
```

The production site is generated in `dist/`.

## GitHub

Create a GitHub repository, then upload the source files or push this directory using Git. Keep `assets/logodi-campus.png`; it is the supplied campus image. Do not upload `node_modules`, credentials, or the generated `dist` folder.

If using GitHub CLI after signing in, run from this directory:

```sh
git add index.html styles.css mobile.css vibrant.css app.js data.js prompt.js assets scripts tests package.json vercel.json README.md .gitignore
git commit -m "Build LOGODI multilingual research prompt workshop"
gh repo create logodi-global-ai-lab --private --source=. --push
```

The repository visibility is your choice. These commands are instructions and have not been executed automatically.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import your GitHub repository.
2. Keep the project root at this directory. Choose **Other** as the framework preset if asked.
3. Build command: `npm run build`. Output directory: `dist`.
4. No environment variables are required. Click **Deploy**.

`vercel.json` already specifies the build, output directory and security headers. Subsequent pushes to the production branch can redeploy through Vercel's Git integration.

## Workshop experience

- Five steps: country → challenge → context → research prompt → image prompt. The fifth menu contains the six-concept promotional poster prompt.
- Ten participating countries and three suggested scenarios per country. Other scenarios and custom problems remain available.
- Ten prompt/report languages: English, Mongolian, Spanish, Sinhala, Swahili, Uzbek, Khmer, Filipino, Vietnamese and Kyrgyz. Language can be changed independently of country.
- Six prompt elements, evidence standards, comparable cases, citations, and a 90-day pilot plan.
- An additional English image-generation prompt for six promotional poster concepts in one 2-column × 3-row image, with poster copy in the selected language and a downloadable LOGODI logo.
- Header and footer logos return to the first step at the top of the page, preserving the current draft.
- Copy, text download, English template reference, Gemini link, and post-research reflection checklist.
- Official Gemini App Store (iPhone/iPad) and Google Play (Android) links on the landing page and completed prompt screen. Store links do not transfer the prompt; participants copy and paste it into Gemini.
- Browser-local draft persistence and reset. No backend, analytics, remote fonts or AI API calls.

The interface intentionally stays in English. Curated templates and selected options are localized. **Participant-entered text is preserved verbatim, not translated.** Write custom content in the desired report language, or let Gemini interpret it. Translations should receive a native-speaker review before formal international delivery.

## Content and limitations

Country scenarios are **workshop hypotheses, not verified national diagnoses**. Templates tell Gemini to verify assumptions and prioritize reliable sources. Institution abbreviations follow the participant list supplied for this project; Kyrgyzstan's institution is left open.

The campus photo and LOGODI logo were supplied by the requester. The original transparent logo is used in the header, footer and favicon; its aspect ratio is preserved.

Opening Gemini does not transmit the prompt or automatically enable Deep Research. Participants select the feature in their own account, paste the prompt, and review the research plan. Feature availability and quotas depend on their account.

Sources for institutional naming and tool workflow:
- https://logodi.go.kr/en/content.action?cmsid=102010200000
- https://support.google.com/gemini/answer/15719111?hl=en

## Edit content

`data.js`: countries, institution abbreviations, scenario suggestions and localized templates.

`prompt.js`: prompt composition and safe draft normalization.

`app.js`: accessible step navigation, validation, persistence and interactions.

`styles.css`: responsive layout, typography and workshop branding.

Automated tests cover all country/scenario prompts, language switching, custom content preservation and invalid saved drafts. Native-speaker translation review is separate from these checks.
