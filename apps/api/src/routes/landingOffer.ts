import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireSuperadmin } from '../middleware/auth.js';

const OFFER_KEYS = {
  enabled: 'landing_offer_enabled',
  message: 'landing_offer_message',
  buttonText: 'landing_offer_button_text',
  buttonHref: 'landing_offer_button_href',
} as const;

const defaults = {
  enabled: true,
  message: 'Get ₹3050 worth for just ₹1425 with Exclusive Launch Offer 🎉',
  buttonText: 'Check Offer Now',
  buttonHref: '/pricing#pricing-plans',
};

async function readOffer(app: FastifyInstance) {
  const rows = await app.prisma.platformSetting.findMany({
    where: { key: { in: Object.values(OFFER_KEYS) } },
  });
  const values = new Map(rows.map((row) => [row.key, row.value]));
  return {
    enabled: values.has(OFFER_KEYS.enabled) ? values.get(OFFER_KEYS.enabled) === 'true' : defaults.enabled,
    message: values.get(OFFER_KEYS.message) || defaults.message,
    buttonText: values.get(OFFER_KEYS.buttonText) || defaults.buttonText,
    buttonHref: values.get(OFFER_KEYS.buttonHref) || defaults.buttonHref,
  };
}

export async function registerLandingOfferRoutes(app: FastifyInstance): Promise<void> {
  app.get('/landing/offer', async () => ({ success: true, data: await readOffer(app) }));

  app.patch('/landing/offer', { preHandler: requireSuperadmin() }, async (request, reply) => {
    const body = z.object({
      enabled: z.boolean(),
      message: z.string().trim().min(1).max(180),
      buttonText: z.string().trim().min(1).max(40),
      buttonHref: z.string().trim().min(1).max(240),
    }).parse(request.body);

    await app.prisma.$transaction([
      app.prisma.platformSetting.upsert({ where: { key: OFFER_KEYS.enabled }, create: { key: OFFER_KEYS.enabled, value: String(body.enabled) }, update: { value: String(body.enabled) } }),
      app.prisma.platformSetting.upsert({ where: { key: OFFER_KEYS.message }, create: { key: OFFER_KEYS.message, value: body.message }, update: { value: body.message } }),
      app.prisma.platformSetting.upsert({ where: { key: OFFER_KEYS.buttonText }, create: { key: OFFER_KEYS.buttonText, value: body.buttonText }, update: { value: body.buttonText } }),
      app.prisma.platformSetting.upsert({ where: { key: OFFER_KEYS.buttonHref }, create: { key: OFFER_KEYS.buttonHref, value: body.buttonHref }, update: { value: body.buttonHref } }),
    ]);

    return reply.send({ success: true, data: await readOffer(app) });
  });
}
