import { Readable } from 'node:stream'
import { db } from '@/infra/db/index.js'
import { schema } from '@/infra/db/schemas/index.js'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage.js'
import { type Either, makeLeft, makeRight } from '@/shared/either.js'
import { z } from 'zod'
import { InvalidFileFormat } from './errors/invalid-file-format.js'

const uploadImageInput = z.object({
	fileName: z.string(),
	contentType: z.string(),
	contentStream: z.instanceof(Readable),
})

const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/webp']

type UploadImageInput = z.input<typeof uploadImageInput>

export async function uploadImage(input: UploadImageInput): Promise<
	Either<
		InvalidFileFormat,
		{
			url: string
		}
	>
> {
	const { contentStream, contentType, fileName } = uploadImageInput.parse(input)

	if (!allowedMimeTypes.includes(contentType)) {
		return makeLeft(new InvalidFileFormat())
	}

	const { key, url } = await uploadFileToStorage({
		folder: 'images',
		fileName,
		contentType,
		contentStream,
	})

	await db.insert(schema.uploads).values({
		name: fileName,
		remoteKey: key,
		remoteUrl: url,
	})

	return makeRight({ url: 'url' })
}
