import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { json } from "./k2.js";

initializeApp({
  credential: cert(json),
});

const db = getFirestore();

/**
 * This retries the current video's like/dislike on firestore using
 * it's videoId; sends the likes and dislikes back to the client
 * @param {string} videoId - the youtube video id
 * @response {Object} like/dislike data from Firestore
 */
export async function getVideo(videoId) {
  const ref = db.collection("videos").doc(videoId);
  const doc = await ref.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc;
  }
}

/**
 * Increments the like value of the videoId to Firestore
 *
 * @param {string} videoId - the youtube video id
 * @response {Object} Success
 * @raises error on db
 */
export async function like(videoId) {
  const doc = await getVideo(videoId);
  let data = {};
  if (doc !== null) {
    data = {
      likes: doc.data().likes + 1,
      dislikes: doc.data().dislikes,
    };
    await db
      .collection("videos")
      .doc(videoId)
      .set(data)
      .catch((e) => console.log(e));
  }
}

/**
 * Increments the dislike value of the videoId to Firestore
 *
 * @param {string} videoId - the youtube video id
 * @response {Object} Success
 * @raises error on db
 */
export async function dislike(videoId) {
  const doc = await getVideo(videoId);
  let data = {};
  if (doc !== null) {
    data = {
      likes: doc.data().likes,
      dislikes: doc.data().dislikes + 1,
    };
    const res = await db.collection("videos").doc(videoId).set(data);
  }
}

/**
 * Adds the videoId to Firestore
 *
 * @param {string} videoId - the youtube video id
 * @response {Object} Success
 * @raises error on db
 */
export async function addVideo(videoId) {
  const doc = await getVideo(videoId);
  let data = {};
  if (doc !== null) {
    data = {
      likes: doc.data().likes,
      dislikes: doc.data().dislikes,
    };
    const res = await db.collection("videos").doc(videoId).set(data);
  }
  // If it is a new video
  else {
    data = {
      likes: 0,
      dislikes: 0,
    };
  }
  // Add a new document in collection "cities" with ID 'LA'
  await db.collection("videos").doc(videoId).set(data);
}
