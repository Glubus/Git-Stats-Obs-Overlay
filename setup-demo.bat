@echo off
echo Configuration de la démo Git Stats...

REM Copier le fichier d'exemple pour tester l'interface
copy "src\git-stats.example.json" "public\git-stats.json"

if %ERRORLEVEL% neq 0 (
    echo Erreur lors de la copie du fichier d'exemple
    pause
    exit /b 1
)

echo ✅ Données d'exemple copiées!
echo.
echo Vous pouvez maintenant :
echo 1. Exécuter: pnpm dev
echo 2. Ouvrir: http://localhost:3000
echo 3. Tester l'interface avec des données de démonstration
echo.
echo Pour utiliser de vraies données Git, exécutez: update-git-stats.bat
echo.

pause 