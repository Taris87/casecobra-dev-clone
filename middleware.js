import { NextResponse } from 'next/server';
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(req) {
  try {
    // Verwenden Sie handleAuth, um die Authentifizierung zu überprüfen
    const response = await handleAuth()(req);

    if (response.status !== 200) {
      // Wenn die Authentifizierung fehlschlägt, leiten Sie den Benutzer zur Anmeldeseite weiter
      return NextResponse.redirect('/api/auth/login');
    }

    // Wenn die Authentifizierung erfolgreich ist, fahren Sie mit der Anfrage fort
    return NextResponse.next();
  } catch (error) {
    // Bei einem Fehler leiten Sie den Benutzer zur Fehlerseite weiter
    return NextResponse.redirect('/error');
  }
}

// Definieren Sie die Routen, auf die die Middleware angewendet werden soll
export const config = {
  matcher: ['/api/:path*', '/dashboard'],
};