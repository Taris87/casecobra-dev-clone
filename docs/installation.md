# Installation

Diese Anleitung führt Sie durch den Prozess der Installation und Einrichtung von CaseCobra.

## Voraussetzungen

- Node.js (Version 18 oder höher)
- pnpm
- Git

## Schritt-für-Schritt Installation

1. Repository klonen
```bash
git clone https://github.com/yourusername/casecobra.git
cd casecobra
```

2. Abhängigkeiten installieren
```bash
pnpm install
```

3. Umgebungsvariablen konfigurieren
```bash
cp .env.example .env
```
Passen Sie die Werte in der `.env` Datei entsprechend Ihrer Umgebung an.

4. Datenbank einrichten
```bash
pnpm prisma generate
pnpm prisma db push
```

5. Entwicklungsserver starten
```bash
pnpm dev
```

Die Anwendung ist nun unter `http://localhost:3000` verfügbar.

## Entwicklungsumgebung

Für die beste Entwicklungserfahrung empfehlen wir:
- Visual Studio Code
- ESLint Extension
- Prettier Extension
