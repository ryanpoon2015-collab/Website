@echo off

if "%1" == "" (
    start chrome.exe "http://localhost:3000/"
    npm run dev
    goto :EOF
)

call "%~dp0utils\venv\Scripts\activate"
python "%~dp0utils\init.py" %*