# server-phonebook

Live server at https://superhero-server-we7h.onrender.com

# to start aplication:

1. run "npm i" to install dependencies
2. create ".env" file to setup environment variables:
   example:

   PORT = 3001

   DB_INFO = "mongoDB connection info"

   CLOUD_NAME = "cloudinary cloud name"

   API_KEY = "cloudinary api_key"

   API_SECRET = "cloudinary api_secret"

3. run app width command "npm start"

# Endpoints

1. GET /hero -> get all hero in database. Query string: page=(default: 1).
2. GET /hero/:id -> get hero by id.
3. POST /hero -> create hero. Require data in multipart/form-data with fields: nickname, real_name, origin_description, superpowers, catch_phrase, Image.
4. PATCH /hero/info/:patchField -> patch hero text field. Require data in JSON width dields: id, json
5. PATCH /hero/image -> add new image to existing hero. Require data in multipart/form-data with fields: id. Image,
6. PATCH /hero/image/:id(image ID) -> delete image from existing hero. Require data in JSON width dields: id (hero ID)
7. DELETE /hero/:id -> delete hero by id
