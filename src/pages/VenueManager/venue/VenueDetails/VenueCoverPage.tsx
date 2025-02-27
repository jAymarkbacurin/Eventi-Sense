import React, { useState, useEffect } from 'react';
import supabase from '../../../../api/supabaseClient';

interface ImageUploadFormProps {
    venueId: string;
    isEditing: boolean;
    setIsEditingImage: (value: boolean) => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ venueId, isEditing, setIsEditingImage  }) => {
    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentImage = async () => {
            try {
                const { data: venueData, error: venueError } = await supabase
                    .from('venues')
                    .select('cover_image_url')
                    .eq('id', venueId);

                if (venueError) {
                    console.error("Error fetching venue data:", venueError);
                    return;
                }

                if (venueData && venueData.length > 0) {
                    setCurrentImageUrl(venueData[0].cover_image_url);
                }

            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        };

        fetchCurrentImage();
    }, [venueId]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!image) {
            setError('Please select an image to upload.');
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(false);

        try {
            const fileExt = image.name.split('.').pop();
            const fileName = `${venueId}_${new Date().getTime()}.${fileExt}`;
            const filePath = `VenuesPhoto/CoverPhoto/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('company_logos')
                .upload(filePath, image);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('company_logos')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('venues')
                .update({ cover_image_url: publicUrl })
                .eq('id', venueId);

            if (updateError) {
                throw updateError;
            }

            setSuccess(true);

            // Update current image URL after successful upload
            const { data: venueData, error: venueError } = await supabase
                .from('venues')
                .select('cover_image_url')
                .eq('id', venueId);

            if (venueError) {
                console.error("Error fetching venue data:", venueError);
                return;
            }

            if (venueData && venueData.length > 0) {
                setCurrentImageUrl(venueData[0].cover_image_url);
            }

        } catch (err: any) {
            console.error('Error uploading image:', err);
            setError(err.message || 'An error occurred while uploading the image.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-900 p-[2rem] border-[1px] border-gray-300 dark:border-gray-700 rounded-3xl ${
            isEditing ? 'border-2 rounded-3xl border-indigo-400 dark:border-indigo-500' : ''
        }`}>
            <div className='flex justify-between mb-4'>
                <h1 className="text-3xl font-bold font-bonanova text-gray-700 dark:text-gray-200">Cover Photo</h1>
                <div>
                    {!isEditing &&  (
                        <>
                            <button
                                onClick={() => setIsEditingImage(true)}
                                className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
                            >
                                Edit 
                            </button>
                        </>
                    )}
                    {isEditing  && (
                        <button
                            onClick={() => {
                                setIsEditingImage(false);
                            }}
                            className="text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
                        >
                            Cancel
                        </button>
                    )}</div>
            </div>

            {currentImageUrl && (
                <img
                    src={currentImageUrl}
                    alt="Current Cover Image"
                    className="mb-4 h-[500px] w-full flex justify-center "
                />
            )}
            
            {isEditing && (
                <>
                <div className='py-4'>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-slate-500 dark:text-gray-400
                            file:mr-4 file:py-4 file:px-6
                            file:rounded-full file:border-0 file:p-2
                            file:text-sm file:font-semibold
                            file:bg-violet-50 dark:file:bg-violet-900/20 
                            file:text-indigo-600 dark:file:text-indigo-400
                            hover:file:bg-violet-100 dark:hover:file:bg-violet-900/30"
                    />
                </div>
             
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:bg-indigo-300 dark:disabled:bg-indigo-700"
                >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
                </>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">Image uploaded successfully!</p>}
        </div>
    );
};

export default ImageUploadForm;