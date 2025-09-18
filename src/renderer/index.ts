import { cleanText, CleanTextOptions, CleanTextResult, getCleanDescription } from '../utils/textCleaner';

// DOM elements
const originalTextArea = document.getElementById('originalText') as HTMLTextAreaElement;
const cleanedTextArea = document.getElementById('cleanedText') as HTMLTextAreaElement;
const originalCount = document.getElementById('originalCount') as HTMLSpanElement;
const cleanedCount = document.getElementById('cleanedCount') as HTMLSpanElement;
const removedCount = document.getElementById('removedCount') as HTMLSpanElement;
const statusText = document.getElementById('statusText') as HTMLSpanElement;

// Buttons
const pasteBtn = document.getElementById('pasteBtn') as HTMLButtonElement;
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
const copyOriginalBtn = document.getElementById('copyOriginalBtn') as HTMLButtonElement;

// Options
const autoPasteCheckbox = document.getElementById('autoPaste') as HTMLInputElement;
const preserveWhitespaceCheckbox = document.getElementById('preserveWhitespace') as HTMLInputElement;
const removeLineBreaksCheckbox = document.getElementById('removeLineBreaks') as HTMLInputElement;

// State
let lastCleanResult: CleanTextResult | null = null;
let isProcessing = false;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateStatus('Ready to clean text');
});

function setupEventListeners(): void {
    // Text area events
    originalTextArea.addEventListener('input', handleTextInput);
    originalTextArea.addEventListener('paste', handlePaste);
    
    // Button events
    pasteBtn.addEventListener('click', handlePasteFromClipboard);
    clearBtn.addEventListener('click', handleClear);
    copyBtn.addEventListener('click', handleCopyCleaned);
    copyOriginalBtn.addEventListener('click', handleCopyOriginal);
    
    // Option changes
    preserveWhitespaceCheckbox.addEventListener('change', handleTextInput);
    removeLineBreaksCheckbox.addEventListener('change', handleTextInput);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

async function handlePasteFromClipboard(): Promise<void> {
    try {
        setProcessing(true);
        updateStatus('Reading from clipboard...');
        
        const clipboardText = await window.electronAPI.getClipboardText();
        
        if (clipboardText) {
            originalTextArea.value = clipboardText;
            await processText();
            updateStatus('Text pasted from clipboard');
        } else {
            updateStatus('Clipboard is empty');
        }
    } catch (error) {
        console.error('Error reading clipboard:', error);
        updateStatus('Error reading from clipboard');
    } finally {
        setProcessing(false);
    }
}

function handlePaste(event: ClipboardEvent): void {
    // Let the paste complete first, then process
    setTimeout(() => {
        if (autoPasteCheckbox.checked) {
            processText();
        }
    }, 10);
}

function handleTextInput(): void {
    if (autoPasteCheckbox.checked) {
        processText();
    }
}

async function processText(): Promise<void> {
    const text = originalTextArea.value;
    
    if (!text.trim()) {
        clearCleanedText();
        return;
    }
    
    try {
        setProcessing(true);
        
        const options: CleanTextOptions = {
            removeZeroWidth: true,
            removeControlChars: true,
            removeNonPrintable: true,
            removeInvisible: true,
            preserveWhitespace: preserveWhitespaceCheckbox.checked && !removeLineBreaksCheckbox.checked
        };
        
        lastCleanResult = cleanText(text, options);
        
        cleanedTextArea.value = lastCleanResult.cleanedText;
        updateCounts();
        updateStatus(getCleanDescription(lastCleanResult));
        
        // Enable copy buttons if there's content
        copyBtn.disabled = !lastCleanResult.cleanedText;
        copyOriginalBtn.disabled = !text;
        
    } catch (error) {
        console.error('Error processing text:', error);
        updateStatus('Error processing text');
    } finally {
        setProcessing(false);
    }
}

function clearCleanedText(): void {
    cleanedTextArea.value = '';
    lastCleanResult = null;
    updateCounts();
    updateStatus('Ready to clean text');
    copyBtn.disabled = true;
    copyOriginalBtn.disabled = !originalTextArea.value;
}

function handleClear(): void {
    originalTextArea.value = '';
    clearCleanedText();
    originalTextArea.focus();
}

async function handleCopyCleaned(): Promise<void> {
    if (!lastCleanResult?.cleanedText) return;
    
    try {
        await window.electronAPI.setClipboardText(lastCleanResult.cleanedText);
        updateStatus('Cleaned text copied to clipboard');
        
        // Visual feedback
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyBtn.textContent = '📤 Copy Cleaned Text';
        }, 2000);
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        updateStatus('Error copying to clipboard');
    }
}

async function handleCopyOriginal(): Promise<void> {
    const text = originalTextArea.value;
    if (!text) return;
    
    try {
        await window.electronAPI.setClipboardText(text);
        updateStatus('Original text copied to clipboard');
        
        // Visual feedback
        copyOriginalBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyOriginalBtn.textContent = '📋 Copy Original';
        }, 2000);
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        updateStatus('Error copying to clipboard');
    }
}

function updateCounts(): void {
    const originalLength = originalTextArea.value.length;
    const cleanedLength = cleanedTextArea.value.length;
    
    originalCount.textContent = originalLength.toLocaleString();
    cleanedCount.textContent = cleanedLength.toLocaleString();
    
    if (lastCleanResult && lastCleanResult.removedCount > 0) {
        removedCount.textContent = `(-${lastCleanResult.removedCount})`;
        removedCount.style.display = 'inline';
    } else {
        removedCount.style.display = 'none';
    }
}

function updateStatus(message: string): void {
    statusText.textContent = message;
}

function setProcessing(processing: boolean): void {
    isProcessing = processing;
    
    if (processing) {
        document.body.classList.add('loading');
        pasteBtn.disabled = true;
    } else {
        document.body.classList.remove('loading');
        pasteBtn.disabled = false;
    }
}

function handleKeyboardShortcuts(event: KeyboardEvent): void {
    // Ctrl/Cmd + V - Paste from clipboard
    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
        if (document.activeElement === originalTextArea) {
            // Let the normal paste happen, then process
            setTimeout(() => {
                if (autoPasteCheckbox.checked) {
                    processText();
                }
            }, 10);
        }
    }
    
    // Ctrl/Cmd + A - Select all in focused textarea
    if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
        if (document.activeElement === originalTextArea || document.activeElement === cleanedTextArea) {
            event.preventDefault();
            (document.activeElement as HTMLTextAreaElement).select();
        }
    }
    
    // Ctrl/Cmd + Enter - Paste from clipboard
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        handlePasteFromClipboard();
    }
    
    // Escape - Clear all
    if (event.key === 'Escape') {
        handleClear();
    }
}

// Auto-focus the original text area
originalTextArea.focus();
