import { env } from '@/env.js'
import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'

import { getUploadsRoute } from './routes/get-uploads.js'
import { uploadImageRoute } from './routes/upload-image.js'
import { transformSwaggerSchema } from './transform-swagger-schema.js'
const server = fastify()

server.register(fastifyMultipart)
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Upload Server',
			version: '1.0.0',
		},
	},
	transform: transformSwaggerSchema,
})
server.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: 'Validation error.',
			issues: error.validation,
		})
	}

	// Envia o erro p/ alguma ferramenta de observabilidade (Sentry/Datadog/Grafana/Otel)
	console.error(error)

	return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { origin: '*' })

server.register(uploadImageRoute)
server.register(getUploadsRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	console.log('HTTP server running!')
})
