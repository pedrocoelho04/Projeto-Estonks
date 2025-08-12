@echo off
cd ./React
cls

:loop
echo.
echo ===================================================
echo    Iniciando o build do projeto (npm run build)...
echo ===================================================
echo.

rem AQUI ESTA A CORRECAO: Use 'call' para garantir que o controle retorne ao script.
call npm install -f
pause