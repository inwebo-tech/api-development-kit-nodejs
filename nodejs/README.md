Getting Started
--------------------------
Before you start writing code, you need :
- to have node.js installed on your computer
- to have an inWebo administrator account. You can get one at: https://www.myinwebo.com/signup

When logged in to inWebo Administration Console, go to tab "Secure Sites". From this screen, you will be able to get:
- Your inWebo Service ID
- An inWebo Web ServiceS API Access certificate file in PEM format (.crt)

These 2 items are mandatory. 

Once your have them:

1. Create the certificate file and the RSA key file
    * Copy the .crt file in the "src" directory of the package, this will be the certificate file
    * Duplicate the .crt file, and rename the second file (for example myCert.rsa), this will be the key file
    * Edit the certificate file and remove anything but the content of the certificate: Your file must end looking like (see samples/Sample.crt):
    ```
    -----BEGIN CERTIFICATE-----
    <certificate string>
    -----END CERTIFICATE-----
    ```
    ```
    -----BEGIN CERTIFICATE-----
    <second certificate string>
    -----END CERTIFICATE-----
    ```
    * Edit the key file and remove anything but the content of the key:  Your file must end looking like (see samples/Sample.rsa):
    ```
    -----BEGIN RSA PRIVATE KEY-----
    <rsa key string>
    -----END RSA PRIVATE KEY-----
    ```
2. Define the settings
    * Go the "src" directory of the package :
        - rename settings_inwebo-SAMPLE.json file into settings_inwebo.json
        - edit the settings.json file:
            -> enter your Service ID
            -> enter the certificate file path
            -> enter the RSA key file path
            -> enter the certificate passphrase
            -> enter your proxy settings if needed using the following syntax: "http://username:password@proxy.example.com:8080/"
3. Install the required node js modules:
    * Execute "npm install" in the src directory to install the dependencies (it will create a node_modules folder in src)
    * Execute "npm start". Open a browser and call URL http://localhost:8000 (by default)