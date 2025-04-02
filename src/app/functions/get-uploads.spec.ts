import { randomUUID } from 'node:crypto'
import { isRight, unwrapEither } from '@/shared/either.js'
import { makeUpload } from '@/test/factories/make-upload.js'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { getUploads } from './get-uploads.js'

describe('get uploads', () => {
	it('should be able to get the uploads', async () => {
		const namePattern = randomUUID()

		const upload1 = await makeUpload({ name: `${namePattern}.webp` })
		const upload2 = await makeUpload({ name: `${namePattern}.webp` })
		const upload3 = await makeUpload({ name: `${namePattern}.webp` })
		const upload4 = await makeUpload({ name: `${namePattern}.webp` })
		const upload5 = await makeUpload({ name: `${namePattern}.webp` })

		const sut = await getUploads({
			searchQuery: namePattern,
		})

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).total).toEqual(5)

		expect(unwrapEither(sut).uploads).toEqual([
			expect.objectContaining({ id: upload5.id }),
			expect.objectContaining({ id: upload4.id }),
			expect.objectContaining({ id: upload3.id }),
			expect.objectContaining({ id: upload2.id }),
			expect.objectContaining({ id: upload1.id }),
		])
	})

	it('should be able to get paginated the uploads', async () => {
		const namePattern = randomUUID()

		const upload1 = await makeUpload({ name: `${namePattern}.webp` })
		const upload2 = await makeUpload({ name: `${namePattern}.webp` })
		const upload3 = await makeUpload({ name: `${namePattern}.webp` })
		const upload4 = await makeUpload({ name: `${namePattern}.webp` })
		const upload5 = await makeUpload({ name: `${namePattern}.webp` })

		const sut = await getUploads({
			searchQuery: namePattern,
			page: 2,
			pageSize: 2,
		})

		console.log(unwrapEither(sut))

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).total).toEqual(5)

		expect(unwrapEither(sut).uploads).toEqual([
			expect.objectContaining({ id: upload3.id }),
			expect.objectContaining({ id: upload2.id }),
		])
	})

	it('should be able to get ordered asc the uploads', async () => {
		const namePattern = randomUUID()

		const upload1 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: new Date(),
		})
		const upload2 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: dayjs().add(2, 'days').toDate(),
		})
		const upload3 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: dayjs().add(3, 'days').toDate(),
		})
		const upload4 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: dayjs().add(4, 'days').toDate(),
		})

		const upload5 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: dayjs().subtract(5, 'days').toDate(),
		})

		const sut = await getUploads({
			searchQuery: namePattern,
			page: 1,
			pageSize: 2,
			sortBy: 'createdAt',
			sortDirection: 'asc',
		})

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).total).toEqual(5)

		expect(unwrapEither(sut).uploads).toEqual([
			expect.objectContaining({ id: upload5.id }),
			expect.objectContaining({ id: upload1.id }),
		])
	})

	it('should be able to get ordered desc the uploads', async () => {
		const namePattern = randomUUID()

		const upload1 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: new Date(),
		})
		const upload2 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: dayjs().add(2, 'days').toDate(),
		})
		const upload3 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: dayjs().add(3, 'days').toDate(),
		})
		const upload4 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: dayjs().add(4, 'days').toDate(),
		})

		const upload5 = await makeUpload({
			name: `${namePattern}.webp`,
			createdAt: dayjs().subtract(5, 'days').toDate(),
		})

		const sut = await getUploads({
			searchQuery: namePattern,
			page: 1,
			pageSize: 2,
			sortBy: 'createdAt',
			sortDirection: 'desc',
		})

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).total).toEqual(5)

		expect(unwrapEither(sut).uploads).toEqual([
			expect.objectContaining({ id: upload4.id }),
			expect.objectContaining({ id: upload3.id }),
		])
	})
})
