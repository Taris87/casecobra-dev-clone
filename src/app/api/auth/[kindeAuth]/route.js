import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Erlaubt alle Ursprünge
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Beenden Sie die OPTIONS-Anfrage frühzeitig
    return res.status(200).end();
  }

  try {
    // Rufen Sie handleAuth auf, um die Authentifizierung zu handhaben
    const authResponse = await handleAuth()(req, res);

    if (authResponse.status !== 200) {
      // Wenn die Authentifizierung fehlschlägt, senden Sie eine entsprechende Antwort
      return res.status(authResponse.status).json({ message: 'Authentication failed' });
    }

    // Führen Sie hier die Logout-Logik aus, wenn die Authentifizierung erfolgreich ist
    // Zum Beispiel: Sitzungsdaten löschen, Cookies entfernen, etc.
    res.status(200).json({ message: 'Logout erfolgreich' });
  } catch (error) {
    // Fehlerbehandlung
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}