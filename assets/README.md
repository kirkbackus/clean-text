# Assets Directory

This directory contains the application icons and other assets needed for building the Electron app.

## Required Files

You need to add the following icon files to this directory:

- `icon.ico` - Windows icon (256x256 pixels, ICO format)
- `icon.icns` - macOS icon (512x512 pixels, ICNS format)  
- `icon.png` - Linux icon (512x512 pixels, PNG format)

## Creating Icons

### From a single PNG file (512x512 recommended):

**Windows (.ico):**
- Use online converters like https://convertio.co/png-ico/
- Or use ImageMagick: `magick icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico`

**macOS (.icns):**
- Use online converters like https://cloudconvert.com/png-to-icns
- Or use ImageMagick: `magick icon.png icon.icns`

**Linux (.png):**
- Use the same 512x512 PNG file

## Icon Design Tips

- Use a simple, recognizable design
- Ensure it looks good at small sizes (16x16, 32x32)
- Use high contrast colors
- Consider your app's purpose (text cleaning) in the design
- Make it square with some padding around the edges

## Placeholder Icons

If you don't have custom icons yet, you can:
1. Use a simple text-based icon with "CT" for "Clean Text"
2. Use a generic document or text icon
3. Create a simple geometric design

The app will still build and work without custom icons, but it's recommended to add them for a professional appearance.
