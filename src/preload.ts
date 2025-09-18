import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getClipboardText: () => ipcRenderer.invoke('get-clipboard-text'),
  setClipboardText: (text: string) => ipcRenderer.invoke('set-clipboard-text', text),
  getClipboardFormats: () => ipcRenderer.invoke('get-clipboard-formats')
});

// Type definitions for the exposed API
declare global {
  interface Window {
    electronAPI: {
      getClipboardText: () => Promise<string>;
      setClipboardText: (text: string) => Promise<boolean>;
      getClipboardFormats: () => Promise<string[]>;
    };
  }
}
