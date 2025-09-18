# Clean Text - UTF-8 Character Cleaner

A standalone Electron application that removes hidden UTF-8 characters from text. Perfect for cleaning up text copied from various sources that may contain invisible or unwanted characters.

![Clean Text App](https://img.shields.io/badge/Electron-28.0.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🔍 Dual Text Areas**: Side-by-side view of original and cleaned text with real-time character counting
- **⚡ Real-time Processing**: Text is cleaned automatically as you type or paste
- **📋 Clipboard Integration**: One-click paste from clipboard and copy cleaned text back
- **📊 Character Analysis**: Shows detailed character counts and what types of characters were removed
- **⚙️ Customizable Options**: Control which types of characters to remove with checkboxes
- **⌨️ Keyboard Shortcuts**: Quick access to common functions
- **🎨 Modern UI**: Clean, responsive interface with intuitive controls
- **🔒 Secure**: Uses Electron's context isolation for security

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/clean-text.git
   cd clean-text
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the application:**
   ```bash
   npm run build
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

## 🛠️ Development

### Development Mode
```bash
npm run dev
```
This builds the app in development mode and launches Electron with DevTools open.

### Build for Production
```bash
npm run build
```

### Package for Distribution
```bash
npm run dist
```
Creates distributable packages for Windows, macOS, and Linux in the `build/` directory.

### Clean Build Files
```bash
npm run clean
```

## 📖 Usage

### Basic Workflow
1. **📋 Paste Text**: Click "Paste from Clipboard" button or paste directly into the left text area
2. **👀 View Results**: The cleaned text appears in the right text area automatically
3. **📤 Copy Results**: Click "Copy Cleaned Text" to copy the cleaned version to clipboard
4. **⚙️ Adjust Options**: Use checkboxes to control which characters are removed

### Options
- **Auto-paste from clipboard**: Automatically process text when pasting
- **Preserve line breaks**: Keep line breaks and carriage returns
- **Remove line breaks**: Convert line breaks to spaces

## 🧹 Character Types Removed

The application removes various types of hidden and problematic characters:

### Zero-Width Characters
- Zero Width Non-Joiner (U+200C)
- Zero Width Joiner (U+200D)
- Zero Width Space (U+200B)
- Word Joiner (U+2060)
- Byte Order Mark (U+FEFF)
- Mongolian Vowel Separator (U+180E)

### Invisible Characters
- Various Unicode invisible characters (U+2000-U+200F)
- Line and paragraph separators (U+2028-U+202F)
- Mathematical spaces (U+205F-U+206F)
- Ideographic space (U+3000)
- Hangul filler (U+3164)

### Control Characters
- Non-printable control characters (U+0000-U+001F, U+007F-U+009F)
- Optionally preserves common whitespace (space, tab, line feed, carriage return)

### Non-Printable Characters
- Private use area characters (U+FFF0-U+FFFF)

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + V` | Paste from clipboard (when focused on text area) |
| `Ctrl/Cmd + Enter` | Paste from clipboard (global) |
| `Ctrl/Cmd + A` | Select all in focused text area |
| `Escape` | Clear all text |

## 🏗️ Building for Distribution

The app can be packaged for multiple platforms:

```bash
npm run dist
```

### Supported Platforms
- **Windows**: NSIS installer
- **macOS**: DMG package
- **Linux**: AppImage

Built applications will be in the `build/` directory.

## 🔧 Technical Details

### Architecture
- **Framework**: Electron 28.0.0 with TypeScript 5.3.2
- **Build System**: Webpack 5 with multiple entry points
- **UI**: Vanilla HTML/CSS/TypeScript (no frameworks)
- **Text Processing**: Custom UTF-8 character detection and removal algorithms

### Project Structure
```
src/
├── main.ts              # Main Electron process
├── preload.ts           # Preload script for secure IPC
├── renderer/
│   ├── index.html       # Main UI
│   ├── index.ts         # Renderer process logic
│   └── styles.css       # Application styles
└── utils/
    └── textCleaner.ts   # Text cleaning utilities
```

### Security Features
- Context isolation enabled
- Node integration disabled in renderer
- Secure IPC communication via preload script

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- TypeScript for type safety
- Webpack for module bundling
