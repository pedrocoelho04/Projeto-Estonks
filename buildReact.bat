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
call npm run build

echo.
echo ===================================================
echo Build finalizado.
echo.
echo Deseja executar o build novamente?
echo Digite '1' para SIM ou pressione ENTER para SAIR.
echo ===================================================

rem Limpa a variavel de escolha anterior
set "choice="
rem Aguarda a entrada do usuario e a armazena na variavel 'choice'
set /p "choice=Sua escolha: "

rem Verifica se a entrada foi '1'
if "%choice%"=="1" (
    cls
    goto loop
)

echo Saindo do script...
echo.

rem Garante que a janela nao feche sozinha no final.
