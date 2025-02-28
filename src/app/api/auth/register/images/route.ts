import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
    const data = await request.formData();
    const file = data.get('file') as Blob;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    try {
        // Convertir Blob a Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Promisify the upload_stream function
        const uploadToCloudinary = (): Promise<{ secure_url: string | undefined }> => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'user_images' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (result) {
                            resolve({ secure_url: result.secure_url });
                        } else {
                            reject(new Error('Upload result is undefined'));
                        }
                    }
                });
                stream.end(buffer);
            });
        };

        const uploadResponse = await uploadToCloudinary();

        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (error) {
        return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }
}