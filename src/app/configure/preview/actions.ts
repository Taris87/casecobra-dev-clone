
'use server'

import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Order } from '@prisma/client'
import { log } from 'console'
import { create } from 'domain'

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  })

  if (!configuration) {
    throw new Error('No such configuration found')
  }

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    throw new Error('You need to be logged in')
  }

  const { finish, material } = configuration

  let price = BASE_PRICE
  if (finish === 'textured') price += PRODUCT_PRICES.finish.textured
  if (material === 'polycarbonate')
    price += PRODUCT_PRICES.material.polycarbonate

  let order: Order | undefined = undefined

  try {
    // Sicherstellen, dass user und configuration vorhanden sind
    if (!user?.id || !configuration?.id) {
      throw new Error('Benutzer oder Konfiguration fehlt')
    }

    // Überprüfe, ob bereits eine Bestellung existiert
    const existingOrder = await db.order.findFirst({
      where: {
        userId: user.id,
        configurationId: configuration.id,
      },
    })

    if (existingOrder) {
      // Wenn Bestellung existiert, setze die vorhandene Bestellung
      order = existingOrder
    } else {
      // Ansonsten erstelle eine neue Bestellung
      order = await db.order.create({
        data: {
          amount: price / 100, // Beispiel: Preis in Euro
          userId: user.id,
          configurationId: configuration.id,
          status: 'awaiting_shipment', // Standardstatus
        },
      })
    }

    // Optional: Überprüfe, ob die Bestellung erfolgreich erstellt oder gefunden wurde
    if (order) {
      console.log('Bestellung erfolgreich:', order)
    } else {
      throw new Error('Bestellung konnte nicht erstellt oder gefunden werden')
    }
  } catch (error) {
    console.error('Fehler bei der Bestellung:', error)
    // Optional: Fehler weiterwerfen oder behandeln
    throw error
  }

  const product = await stripe.products.create({
    name: 'Personalisierte Handyhülle',
    images: [configuration.imageUrl],
    default_price_data: {
      currency: 'EUR',
      unit_amount: price,
    },
  })

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ['card', 'paypal'],
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['DE', 'US'] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  })

  return { url: stripeSession.url }
}
