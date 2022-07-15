# NodeJS + Express + Knex + Typescript Demo
Showcase on how to use Node + Express + Knex with Typescript instead of JS

Further information and tutorial will be available on ~~my blog~~

# How to test 
clone this repo 

```$ git clone https://github.com/wienzzz/express-api-typescript-demo
$ npm install
```

This backend is made to fiddle with MySQL database, so just make database with below schema 

```
CREATE TABLE m_item (
  item_id varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  item_sku varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  item_name varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  price_list decimal(15,2) NOT NULL DEFAULT '0.00',
  stock decimal(15,0) NOT NULL DEFAULT '0',
  item_info text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (item_id),
  UNIQUE KEY m_item_item_name_index (item_name),
  UNIQUE KEY m_item_item_sku_index (item_sku)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE m_user (
  user_id varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  user_name varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  user_password varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  api_key varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  refresh_key varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

```

This example also utilize .env file, so create one in your root folder which would look like this 

```
DB_HOST=xxxx 
DB_PORT=3306
DB_NAME=xxxx
DB_USER=xxxx
DB_PASSWORD=xxxx
PORT=3000
```

and to run the server simply use this command 
```$ npm run serve```
