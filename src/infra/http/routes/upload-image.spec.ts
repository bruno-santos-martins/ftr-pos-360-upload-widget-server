import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'
import { uploadImage } from '@/app/functions/upload-image.js'
import { db } from '@/infra/db/index.js'
import { schema } from '@/infra/db/schemas/index.js'
import { isRight } from '@/shared/either.js'
import { and, eq, gt, lt, or, sql } from 'drizzle-orm'
import { beforeAll, describe, expect, it, vi } from 'vitest'

describe('upload image', () => {
	beforeAll(() => {
		vi.mock('@/infra/storage/upload-file-to-storage', () => {
			return {
				uploadFileToStorage: vi.fn().mockImplementation(() => {
					return {
						key: `${randomUUID()}.jpg`,
						url: 'https://storage.com/image.jpg',
					}
				}),
			}
		})
	})

	it('should be able to upload an image', async () => {
		const fileName = `${randomUUID()}.jpg`

		const sut = await uploadImage({
			fileName,
			contentType: 'image/jpg',
			contentStream: Readable.from([]),
		})

		expect(isRight(sut)).toBe(true)

		const result = await db
			.select()
			.from(schema.uploads)
			.where(eq(schema.uploads.name, fileName))

		expect(result).toHaveLength(1)
	})
})
