import { db } from '@/infra/db/index.js'
import { schema } from '@/infra/db/schemas/index.js'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
	server.post(
		'/uploads',
		{
			schema: {
				summary: 'Upload',
				body: {
					name: z.string(),
					password: z.string().optional(),
				},
				response: {
					201: z.object({ uploadId: z.string() }),
					409: z
						.object({
							message: z.string(),
						})
						.describe('Upload already exists.'),
				},
			},
		},
		async (request, reply) => {
			await db.insert(schema.uploads).values({
				name: 'teste.jpg',
				remoteKey: 'teste.jpg',
				remoteUrl: 'http://google.com.br',
			})

			return reply.status(201).send({
				uploadId: 'testeid',
			})
		}
	)
}
