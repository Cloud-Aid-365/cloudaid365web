# CloudAid365

A responsive, dependency-free static website for CloudAid365: Independent Microsoft Cloud Technical Resources.

## Site structure

- `index.html` - Homepage, technical resource library, service overview, and contact form.
- `secure-external-sharing-sharepoint.html` - SharePoint Online case study.
- `organization-wide-email-signature.html` - Exchange Online implementation guide.
- `teams-exchange-coexistence.html` - Teams and Exchange coexistence architecture.
- `styles.css` and `script.js` - Shared responsive styling and progressive client-side interactions.
- `assets/` - Site images.

The contact form deliberately opens the visitor's email application addressed to `info@cloudaid365.com`. This keeps the site fully static and avoids collecting contact details through an unconfigured third-party service.

## Publish with GitHub Pages

1. Create a GitHub repository, then push this folder to its `main` branch.
2. On GitHub, open **Settings** > **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then select **Save**.
5. Wait for the Pages deployment to complete. The site will be published at:

   `https://<github-username>.github.io/<repository-name>/`

All internal links use relative paths, so the website works both at that project URL and on a custom domain. If you attach a custom domain later, update the Organization URL in `index.html`, add its `CNAME` file, and configure the domain in GitHub Pages.

## Local preview

Run the following from the project folder:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173/`.
