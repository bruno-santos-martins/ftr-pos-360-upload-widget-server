import { uploadImage } from '@/app/functions/upload-image.js'
import { db } from '@/infra/db/index.js'
import { schema } from '@/infra/db/schemas/index.js'
import { isRight, unwrapEither } from '@/shared/either.js'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
	server.post(
		'/uploads',
		{
			schema: {
				summary: 'Upload',
				consumes: ['multipart/form-data'],
				response: {
					201: z.object({ uploadId: z.string() }).describe('Image uploaded'),
					400: z
						.object({
							message: z.string(),
						})
						.describe('Upload already exists.'),
				},
			},
		},
		async (request, reply) => {
			const uploadedFile = await request.file({
				limits: {
					fileSize: 1024 * 1024 * 10, //2mb
				},
			})

			//console.log(uploadedFile)

			if (!uploadedFile) {
				return reply.status(400).send({
					message: 'File is requered.',
				})
			}

			const result = await uploadImage({
				fileName: uploadedFile.filename,
				contentType: uploadedFile.mimetype,
				contentStream: uploadedFile.file,
			})

			if (isRight(result)) {
				console.log(unwrapEither(result))
				return reply.status(201).send()
			}

			const error = unwrapEither(result)

			switch (error.constructor.name) {
				case 'InvalidFileFormat':
					return reply.status(400).send({
						message: error.message,
					})
			}
		}
	)
}
