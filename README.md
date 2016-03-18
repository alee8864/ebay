# ebay listing generator

Listing HTML generator for my ebay listings.

With this app you can
- Add the releavant data in the create form from the 'Listing Creation Form' tab.
- Save the listing using the 'Save Listing' button on the 'Listing Creation Form' tab.
- Preview the rendered version of the generated HTML in the 'Preview' tab.
- Copy the generated HTML using the 'Copy HTML' button from the 'Preview' tab

###AWS
This project is useful because it allows you to upload images to s3 so that the images included in the listing are served from a place that you control.

The uploaded files are dropped into the 'listing-generator' bucket

###Running Locally
- install npm packages
 
  ```npm install```
  
- configure aws keys

  ```
  export AWS_ACCESS_KEY=your-aws-access-key-id
  export AWS_SECRET_KEY=your-aws-secret-key
  ```

- install mongodb

- create a folder for your mongodb and start the server
 ```
 mongod --dbpath folder-for-data
 ```
- start app

  ```npm start```

