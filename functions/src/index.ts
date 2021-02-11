import * as functions from "firebase-functions";
// import * as types from "@google-cloud/firestore";
import * as admin from "firebase-admin";
const cors = require('cors')({origin: true});

const log = (name: string, something: any) => {functions.logger.info({name: name, object: something}, {structuredData: true});};

admin.initializeApp();
const db = admin.firestore()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => cors(request, response, () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);
  
  response.send({data: "Hello, World!"});
}));

export const getCategories = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const querySnapshot = await db.collection("Categories").get();
  const categoryData = querySnapshot.docs.map((doc) => {return {name: doc.data().name, id: doc.id}});
  response.send({data: categoryData});
}));

export const getDiscussions = functions.https.onRequest((request, response) => cors(request, response, async () => {
  response.set('Access-Control-Allow-Origin', '*');
  log("body", request.body);

  const category = request.body.data.category;

  const querySnapshot = await db.collection(`Categories/${category}/Discussions`).get();
  const discussionData = querySnapshot.docs.map((doc) => {return {name: doc.data().name, id: doc.id}});
  response.send({data: discussionData});
}));
