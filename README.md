# Clean Text - UTF-8 Character Cleaner

A standalone Electron application that removes hidden UTF-8 characters from text. Perfect for cleaning up text copied from various sources that may contain invisible or unwanted characters.

## Features

- **Dual Text Areas**: Side-by-side view of original and cleaned text
- **Real-time Cleaning**: Text is cleaned as you type or paste
- **Clipboard Integration**: One-click paste from clipboard and copy cleaned text
- **Character Analysis**: Shows character counts and what was removed
- **Customizable Options**: Control which types of characters to remove
- **Keyboard Shortcuts**: Quick access to common functions
- **Modern UI**: Clean, responsive interface with dark theme

## Installation

1. **Clone or download this repository**
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

## Development

- **Development mode:**
  ```bash
  npm run dev
  ```

- **Build for production:**
  ```bash
  npm run build
  ```

- **Package for distribution:**
  ```bash
  npm run dist
  ```

## Usage

1. **Paste Text**: Click "Paste from Clipboard" or paste directly into the left text area
2. **View Results**: The cleaned text appears in the right text area automatically
3. **Copy Results**: Click "Copy Cleaned Text" to copy the cleaned version to clipboard
4. **Options**: Use checkboxes to control which characters are removed

## Character Types Removed

- **Zero-width characters**: ZWNJ, ZWJ, zero-width space, etc.
- **Invisible characters**: Various Unicode invisible characters
- **Control characters**: Non-printable control characters
- **Non-printable characters**: Characters outside the printable range

## Keyboard Shortcuts

- `Ctrl/Cmd + V`: Paste from clipboard
- `Ctrl/Cmd + Enter`: Paste from clipboard
- `Ctrl/Cmd + A`: Select all in focused text area
- `Escape`: Clear all text

## Building for Distribution

The app can be packaged for Windows, macOS, and Linux:

```bash
npm run dist
```

Built applications will be in the `build/` directory.

## Technical Details

- **Framework**: Electron with TypeScript
- **Build System**: Webpack
- **UI**: Vanilla HTML/CSS/JavaScript
- **Text Processing**: Custom UTF-8 character detection and removal

## License

MIT License - feel free to use and modify as needed.
