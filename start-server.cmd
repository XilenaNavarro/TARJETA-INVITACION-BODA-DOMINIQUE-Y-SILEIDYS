@echo off
cd /d "C:\Users\Usuario\OneDrive\Documentos\TARJETA INVITACION BODA SILEIDYS"
set "PATH=C:\Users\Usuario\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\Usuario\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;%PATH%"
pnpm.cmd run dev -- --host 0.0.0.0 --port 3003

