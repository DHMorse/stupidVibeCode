import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { spawn } from 'child_process';

let mainWindow: BrowserWindow | null = null;
let goBackend: any = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

function startGoBackend(): void {
  const goPath = path.join(__dirname, '../backend/main');
  goBackend = spawn(goPath);
  
  goBackend.stdout.on('data', (data: Buffer) => {
    console.log(`Go backend: ${data}`);
  });

  goBackend.stderr.on('data', (data: Buffer) => {
    console.error(`Go backend error: ${data}`);
  });
}

app.whenReady().then(() => {
  createWindow();
  startGoBackend();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (goBackend) {
    goBackend.kill();
  }
}); 