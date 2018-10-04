## Instructions

* Clone the repository `git clone https://github.com/dericlima/timezones_app.git`
* Install Packages `composer install` and `npm install` 
* Generate the app key: `php artisan key:generate`
* Rename the `.env.xample` to `.env` file and configure the database
```
DB_CONNECTION=pqsql or mysql
DB_HOST=127.0.0.1
DB_PORT=XXXX
DB_DATABASE=XXXXX
DB_USERNAME=XXXXXX
DB_PASSWORD=XXXXXX
```
* Migrate the database `php artisan migrate`
* Seed the DB `php artisan db:seed --class=SeedTimezones`
* Start the server `php artisan serve`
* Go to `http://localhost:8000`