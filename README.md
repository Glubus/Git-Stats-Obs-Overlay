# Git Stats OBS Overlay

<div align="center">

![Git Stats Overlay](public/preview.png)

A sleek OBS overlay to display your Git activity during streams.

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)](https://reactjs.org/)
[![Built with Rsbuild](https://img.shields.io/badge/Built%20with-Rsbuild-FF4154.svg)](https://rsbuild.dev/)
[![Styled with TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC.svg)](https://tailwindcss.com/)
[![For OBS Studio](https://img.shields.io/badge/For-OBS%20Studio-302E31.svg)](https://obsproject.com/)

</div>

## ✨ Features

### Stream Integration
- 🎥 **OBS Compatible**: Easy to add as a browser source in OBS Studio
- 🔄 **Live Updates**: Real-time Git statistics during your streams
- 📱 **Flexible Layout**: Horizontal mode for bottom bars, vertical for sidebars
- 🎨 **Stream-ready Themes**: Multiple themes to match your stream aesthetic

### Git Stats
- 📊 **Commit Activity**: Show your latest commits in real-time
- ➕ **Changes Tracking**: Display additions and deletions
- 📁 **File Changes**: Monitor modified files count
- 🔄 **Auto Refresh**: Updates every 30 seconds

### Customization
- 🌓 **Theme System**: Multiple themes powered by DaisyUI
- 🌍 **Multiple Languages**: Support for English, Français, and 中文
- 🎨 **Transparent Background**: Seamlessly integrates with your stream
- ⚙️ **Easy Configuration**: Simple settings panel for quick adjustments

## 🚀 Setup in OBS

1. Install and run the overlay:
```bash
pnpm install
pnpm dev
```

2. In OBS Studio:
   - Add a new "Browser" source
   - Set the URL to `http://localhost:3000`
   - Set the width and height according to your needs
   - Enable "Refresh browser when scene becomes active"

3. Run the stats update script:
```bash
./update-git-stats.bat
```

## ⚙️ Configuration

### Git Project Setup

Create an `.env` file in the project root:
```env
# Path to your Git repository to track
PROJECT_PATH=C:/Users/username/projects/my-project

# Update interval in milliseconds (default: 30000)
UPDATE_INTERVAL=30000
```

### Overlay Settings

Access the settings panel (⚙️) to configure:
- 🎨 Theme selection
- 📱 Layout mode (horizontal/vertical)
- 🌍 Interface language
- 📂 Git project path

## 💻 Development

### Available Commands

```bash
# Development
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm preview     # Preview production build

# Code Quality
pnpm format      # Format code with Biome
pnpm lint        # Check for linting errors
pnpm check       # Auto-fix code issues
```

## 🛠️ Tech Stack

- **Frontend Framework**
  - [React](https://reactjs.org/) - UI library
  - [Rsbuild](https://rsbuild.dev/) - Build tool

- **Styling & UI**
  - [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
  - [DaisyUI](https://daisyui.com/) - Component library
  - [Lucide Icons](https://lucide.dev/) - Beautiful icons

- **Code Quality**
  - [Biome](https://biomejs.dev/) - Formatter & linter
  - [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📺 Stream Integration Tips

- Use the horizontal layout for bottom bars
- Use the vertical layout for side panels
- Match the theme to your stream's color scheme
- Enable transparency for better integration
- Position the overlay away from important game UI elements
- Consider using custom CSS for additional effects

## 📚 Resources

- [OBS Studio Documentation](https://obsproject.com/wiki/)
- [Browser Source Properties](https://obsproject.com/wiki/Sources-Guide#browser-source)
- [Rsbuild Documentation](https://rsbuild.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
