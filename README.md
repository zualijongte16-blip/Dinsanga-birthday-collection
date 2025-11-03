# 🎂 Dinsanga Bday - Birthday Collection Dashboard

A beautiful, romantic web dashboard to collect and showcase memories, photos, and love messages for Dinsanga's birthday!

![Birthday Collection Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Birthday+Collection+Dashboard)

## ✨ Features

- **📸 Photo Gallery** - Upload and display your favorite photos
- **💭 Memory Collection** - Share special moments and memories
- **💌 Love Messages** - Write heartfelt messages and notes
- **🎁 Birthday Wishlist** - Keep track of gift ideas with completion status
- **📊 Statistics Counter** - Track photos, memories, and days together
- **💾 Local Storage** - All data is saved in your browser
- **📱 Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **🎨 Beautiful UI** - Romantic gradient design with smooth animations

## 🚀 Quick Start

### Option 1: Node.js Server (Recommended)

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Or install via package manager (apt, brew, etc.)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open your browser** and go to: `http://localhost:3001`

### Option 2: Python Server

If you have Python installed:

```bash
python -m http.server 8000
```

Then open: `http://localhost:8000`

### Option 3: Direct File Opening

Simply double-click `index.html` to open it directly in your browser.

## 🚂 Deploy to Railway (Free 30-day trial)

1. **Sign up for Railway**: Go to [railway.app](https://railway.app) and create a free account
2. **Connect your GitHub**: Link your GitHub account to Railway
3. **Create a new project**: Click "New Project" → "Deploy from GitHub repo"
4. **Select this repository**: Choose the "dinsanga-bday" repository
5. **Deploy**: Railway will automatically detect the Node.js app and deploy it
6. **Get your URL**: Once deployed, Railway will provide a live URL (e.g., `https://dinsanga-bday.up.railway.app`)

**Railway Free Tier Benefits:**
- 30 days free trial
- Automatic HTTPS
- Custom domain support
- No credit card required for trial
- Automatic deployments from GitHub

## 📁 Project Structure

```
dinsanga-bday/
├── index.html          # Main dashboard page
├── styles.css          # Main styles
├── server.js           # Node.js server
├── package.json        # Project configuration
├── railway.json        # Railway deployment config
├── .gitignore          # Git ignore rules
├── dashboard/          # Dashboard assets
│   ├── script.js       # Dashboard JavaScript
│   ├── styles.css      # Dashboard styles
│   ├── images/         # Birthday images
│   └── playlist/       # Music files
├── memories/           # Memory videos
└── README.md          # This file
```

## 🎯 How to Use

1. **Navigate** between sections using the menu buttons at the top
2. **Add Photos** - Click "Add Photo" and enter an image URL with an optional caption
3. **Share Memories** - Click "Add Memory" to record special moments
4. **Write Messages** - Click "Add Message" to write love notes
5. **Create Wishlist** - Click "Add Wish" to add birthday gift ideas
6. **Track Progress** - Check completion status on wishlist items

## 🎥 Adding Your Birthday Video

To add a personal birthday video to the header:

1. **Prepare your video file** (MP4 format recommended)
2. **Place the video** in the project folder (name it `birthday-video.mp4`)
3. **Update the HTML** - Edit `index.html` and change:
   ```html
   <source src="birthday-video.mp4" type="video/mp4">
   ```
4. **Alternative**: Use a video hosting service URL:
   ```html
   <source src="https://your-video-url.com/video.mp4" type="video/mp4">
   ```

**Video Requirements:**
- Format: MP4 (recommended)
- Resolution: 1920x1080 or 1280x720
- File size: Under 50MB for best performance
- Duration: 30 seconds to 2 minutes

## 💡 Tips

- **Image URLs**: Use direct image links (Imgur, Imgur, or any image hosting service)
- **Data Persistence**: Everything is saved in your browser's local storage
- **Mobile Friendly**: Fully responsive design works great on phones and tablets
- **Customization**: Edit the JavaScript file to change the "Days Together" start date

## 🛠️ Development

To modify the dashboard:

1. **HTML Structure**: Edit `index.html` for layout changes
2. **Styling**: Modify `styles.css` for visual customization
3. **Functionality**: Update `script.js` for feature additions

## 🌟 Customization Ideas

- Change the color scheme in `styles.css`
- Add new sections to the dashboard
- Customize the statistics counter
- Add background music or animations
- Integrate with cloud storage for data backup

## 📝 License

MIT License - Feel free to use and modify for your personal use!

## 💖 Made with Love

This dashboard was created to help you celebrate the most special person in your life. Fill it with beautiful memories and happy moments!

---

**Happy Birthday to your amazing boyfriend! 🎉💕**