# web-api-project

### This project is based on Node JS 
### Prerequisites :

* Node js  (LTS)
* Internet Connection (cloud database)

---
### Basic Structure : 
### There are 3 organizations :
* Ecommerce
* Seller
* Bank
---

---
# How To Run It ?

you need to install pm2 module globally in node js  , and build-essential on linux   

```
    sudo apt install build-essential
```

```bash
    npm install pm2 -g
```

now , clone our github repository.

```bash
    git clone https://github.com/Sumon2017/web-api-project.git
```


open up a terminal in ***web-api-project/onoff***  

now , from **onoff** directory give excecute permission to our scripts  

```bash
    chmod 777 ./on.sh
    chmod 777 ./off.sh
```

now from **onoff** directory to start the program run :

```bash
    ./on.sh
```

cautious : you have to be in **onoff** directory

this will take between 10-15 minutes depending on your hardware and internet speed  

this will create 3 node js servers  (you can see them by [pm2 list]  command )  
At the end of it , success will be printed  


To stop it  , run :  

```bash
    ./off.sh
```

cautious : you have to be in **onoff** directory  
At the end of it , success will be printed  

  
## Now , Open your browser and make 3 new tabs . And hit the following links :  

localhost:3001/index.html  
localhost:3002/admin.html  
localhost:3003/index.html  

These are Ecommerce , Seller and Bank accordingly.  
  
   


  

---
# User Manual :
* Step 1 : sign up in ecommerce application using email , password , bank card no , pin no and other information.  
* Step 2 : login in ecommerce site .  
* Step 3 : select items and place orders. 
* Step 4 : logout and login as admin to pay seller 
* Step 5 : pay seller for an particular order.
* Step 6 : in seller web page see all order list and click deliver button for a particular order.
* Step 7 : from ecommerce web site you can see the order list and their status both as an admin or as a user.   



### **pre-made account** : 
---

| sumon      | admin      |
| ------------- | ------------- |
|zksumon2017@gmail.com|admin|
|pass : 1234|pass : 1234|
---




# NoSql Cloud Database
All servers are connected to their own mongodb cloud databases . So , when testing there should be internet connection . We gave all server secrets and mongodb uri in .env files , So it will work fine .




