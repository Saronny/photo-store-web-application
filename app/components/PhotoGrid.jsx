import React from "react";
import Photo from "./Photo";
import  createSupabaseServerClient from "../utils/supabaseServerClient" ;

async function fetchUserPhotos(user) {
    if(!user) return;

    const supabaseServer = await createSupabaseServerClient();
    const folderPath = `user_uploads/${user.id}/`;
    const { data, error } = await supabaseServer.storage
        .from("photos")
        .list(folderPath);

    if(error) {
        throw error;
    }

    return data;
}

async function getPhotoUrls(photos, user) {
    if(!photos) return;

    const supabaseServer = await createSupabaseServerClient();
    const photoObjects = photos.map(async (photo) => {
        const { data, error } = await supabaseServer.storage
            .from("photos")
            .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60);

        if(error) {
            throw error;
        }

        return {
            url: data.signedUrl,
            photoName: photo.name,
        };
    });

    return Promise.all(photoObjects);
}

async function PhotoGrid() {
  const supabaseServer =  await createSupabaseServerClient();
  const {data: { user }} = await supabaseServer.auth.getUser();
  const photos = await fetchUserPhotos(user);
  const photoObjects = await getPhotoUrls(photos, user);

  return (
    <div className="flex flex-wrap justify-center gap-4">
        {photoObjects.map((photo) => (
            <Photo
                key={photo.photoName}
                src={photo.url}
                alt={`Photo ${photo.photoName}`}
                width={200}
                height={200}
                photoName={photo.photoName}
            />
        ))}
    </div>
  );
}

export default PhotoGrid;
