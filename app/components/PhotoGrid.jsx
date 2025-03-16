import React from "react";
import Photo from "./Photo";
import createSupabaseServerClient from "../utils/supabaseServerClient";

async function fetchUserPhotos(user) {
  if (!user) return;

  const supabaseServer = await createSupabaseServerClient();
  const folderPath = `user_uploads/${user.id}/`;
  const { data, error } = await supabaseServer.storage
    .from("photos")
    .list(folderPath);

  if (error) {
    console.error("Error:", error);
    return;
  }

  return data;
}

async function getPhotoUrls(photos, user) {
  if (!photos) return;

  const supabaseServer = await createSupabaseServerClient();
  const photoObjects = photos.map(async (photo) => {
    const { data, error } = await supabaseServer.storage
      .from("photos")
      .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60);

    if (error) {
      console.error("Error:", error);
      return;
    }

    return {
      url: data.signedUrl,
      photoName: photo.name,
    };
  });

  return Promise.all(photoObjects);
}

async function fetchFavoritesPhotos(user) {
  if (!user) return;

  const supabaseServer = await createSupabaseServerClient();
  const { data, error } = await supabaseServer
    .from("favorites")
    .select("photo_name")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error:", error);
    return;
  }

  return data.map((favorite) => favorite.photo_name);
}

async function PhotoGrid({ favorites = false }) {
  const supabaseServer = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  const photos = await fetchUserPhotos(user);
  const photoObjects = await getPhotoUrls(photos, user);
  const favoritesPhotoNames = await fetchFavoritesPhotos(user);

  const photoWithFavorites = photoObjects.map((photo) => {
    return {
      ...photo,
      isFavorited: favoritesPhotoNames.includes(photo.photoName),
    };
  });

  const displayedPhotos = favorites
    ? photoWithFavorites.filter((photo) => photo.isFavorited)
    : photoWithFavorites;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {displayedPhotos.map((photo) => (
        <Photo
          key={photo.photoName}
          src={photo.url}
          alt={`Photo ${photo.photoName}`}
          width={200}
          height={200}
          photoName={photo.photoName}
          isFavorited={photo.isFavorited}
        />
      ))}
    </div>
  );
}

export default PhotoGrid;
