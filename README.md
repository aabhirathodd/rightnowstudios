# RIGHTNOWSTUDIOS - Non-Coder Customization Guide 🎨

Hi Abhishek! Welcome to your custom Industrial Design & Mechanical Engineering portfolio website.

This website is designed so that you **never need to write or learn complex code**. Everything you want to edit is controlled from simple text files.

---

## ⚡ Quick Start Guide: How to Change Anything

### 1. How to Change Text, Headlines & Links
Open `config.js` in any text editor (like Notepad or VS Code). You will see clear sections:

- **Change your name or studio title**: Update `brandName: "Abhishek Rathod | RIGHTNOWSTUDIOS"`
- **Change hero headline**: Edit `greeting`, `accentName`, or `subtitle`
- **Link your PDF Resume**: Put your `resume.pdf` file into the `assets/` folder and set `resumeUrl: "assets/resume.pdf"`
- **Update Social Links**: Change the `url` in the `socials` array (LinkedIn, Instagram, Email, Behance).

---

### 2. How to Add or Change Project Images & Renders
1. Export your 3D renders or CAD screenshots as `.jpg` or `.png` images.
2. Save them into the `assets/` folder.
3. Open `config.js` and update the project image path:
   ```javascript
   image: "assets/your_new_render.jpg"
   ```
4. Update the project title, category tag, and description text right next to it!

---

### 3. How to Change Colors & Fonts
Open `style.css` in a text editor. Right at the very top, you will see the **CSS Custom Variables**:

```css
:root {
  --accent-orange: #f26522;       /* Signature highlight color */
  --bg-color: #ffffff;            /* Website main background */
  --text-dark: #0f0f0f;           /* Primary text color */
  --card-bg: #e5e5e5;             /* Fallback card background */
  --footer-bg: #0b0b0b;           /* Dark footer background */
}
```
- Change `#f26522` to any color hex code you like (e.g. `#0066FF` for blue or `#E63946` for red).

---

### 4. How to Update Services (Accordion Dropdowns)
In `config.js`, locate the `services` section. You can add, remove, or rename any item under `INDUSTRIAL DESIGN` or `VISUALIZATION`:

```javascript
items: [
  "Concept Generation",
  "CAD",
  "Design Development",
  "CMF Development"
]
```

---

## 🚀 Hosting & Going Live (Free Options)

When you are ready to publish your website live on the internet with your custom domain (e.g. `rightnowstudios.com`):

1. **Netlify** *(Easiest 1-click drag & drop)*:
   - Go to [Netlify.com](https://www.netlify.com) -> Create free account -> Drag & drop the `portfolio` folder directly onto Netlify.
2. **Vercel** or **GitHub Pages**:
   - Push this directory to GitHub and connect it to Vercel or GitHub Pages in 2 minutes.
