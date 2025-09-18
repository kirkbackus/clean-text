# Release Guide

This guide explains how to create and publish releases for the Clean Text Electron app.

## Prerequisites

1. **GitHub Repository**: Make sure your repository is on GitHub
2. **GitHub Token**: You'll need a GitHub token with repo permissions (automatically provided by GitHub Actions)
3. **App Icons**: Add the required icon files to the `assets/` directory (see `assets/README.md`)

## Creating a Release

### Method 1: Using GitHub Actions (Recommended)

1. **Update version in package.json:**
   ```bash
   # Update the version number
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. **Push the version tag:**
   ```bash
   git push origin main
   git push origin --tags
   ```

3. **GitHub Actions will automatically:**
   - Build the app for Windows, macOS, and Linux
   - Create a GitHub release with the built executables
   - Upload the files as release assets

### Method 2: Manual Release

1. **Build locally:**
   ```bash
   npm run dist
   ```

2. **Create a GitHub release:**
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Tag version: `v1.0.0` (match your package.json version)
   - Upload the files from the `build/` directory

## Release Files

The following files will be created for each platform:

### Windows
- `Clean Text Setup 1.0.0.exe` - NSIS installer
- `Clean Text 1.0.0.exe` - Portable executable

### macOS
- `Clean Text-1.0.0.dmg` - Disk image installer

### Linux
- `Clean Text-1.0.0.AppImage` - Portable AppImage
- `clean-text_1.0.0_amd64.deb` - Debian package

## Updating the Repository Information

Before your first release, update these in `package.json`:

1. **Repository URL:**
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/yourusername/clean-text.git"
   }
   ```

2. **Homepage:**
   ```json
   "homepage": "https://github.com/yourusername/clean-text#readme"
   ```

3. **Author information:**
   ```json
   "author": "Your Name <your.email@example.com>"
   ```

4. **Update the publish configuration:**
   ```json
   "publish": {
     "provider": "github",
     "owner": "yourusername",
     "repo": "clean-text"
   }
   ```

## Testing Releases

Before creating a release:

1. **Test locally:**
   ```bash
   npm run dist:win    # Test Windows build
   npm run dist:mac    # Test macOS build (on macOS)
   npm run dist:linux  # Test Linux build (on Linux)
   ```

2. **Test the built executables:**
   - Install and run the built app
   - Verify all features work correctly
   - Check that the app icon appears properly

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm ci`
- Verify that the `assets/` directory contains the required icon files
- Check the GitHub Actions logs for specific error messages

### Icons Not Showing
- Ensure icon files are in the correct format and size
- Check that the file paths in `package.json` match the actual files
- Verify the icons are not corrupted

### Release Not Created
- Check that the tag was pushed: `git push origin --tags`
- Verify GitHub Actions workflow is enabled in repository settings
- Check the Actions tab for any failed workflows

## Security Notes

- The macOS build includes entitlements for code signing
- Windows builds are not code-signed (set `verifyUpdateCodeSignature: false`)
- Consider code signing for production releases if needed

## Next Steps

After your first release:

1. Update the README with download links
2. Consider setting up automatic updates using electron-updater
3. Add release notes and changelog
4. Promote your release on social media or relevant communities
