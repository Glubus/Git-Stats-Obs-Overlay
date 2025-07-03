@echo off
echo Mise à jour des statistiques Git...

REM Aller dans le répertoire du programme Rust
cd git-stats-fetcher

REM Vérifier si Cargo est installé
where cargo >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Erreur: Cargo/Rust n'est pas installé ou pas dans le PATH
    echo Veuillez installer Rust depuis https://rustup.rs/
    pause
    exit /b 1
)

REM Compiler et exécuter le programme Rust
echo Compilation du programme Rust...
cargo run --release -- --path .. --output ../public/git-stats.json

if %ERRORLEVEL% neq 0 (
    echo Erreur lors de l'exécution du programme Rust
    pause
    exit /b 1
)

REM Revenir au répertoire principal
cd ..

echo ✅ Statistiques mises à jour avec succès!
echo Vous pouvez maintenant actualiser votre navigateur ou OBS.

REM Optionnel: ouvrir le navigateur sur localhost
REM start http://localhost:3000

pause 