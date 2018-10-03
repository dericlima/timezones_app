<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        'name'      => $faker->name,
        'email'     => $faker->unique()->safeEmail,
        'password'  => bcrypt('password'),
        'remember_token' => str_random(10),
        'permission'     => 'regular'
    ];
});

$factory->define(App\Models\City::class, function (Faker $faker) {
    return [
        'name'        => $faker->name,
        'lat'         => $faker->latitude,
        'long'        => $faker->longitude,
        'timezone_id' => $faker->numberBetween(1, 30),
    ];
});

$factory->define(\App\Models\CitiesUser::class, function () {
    return [
        'user_id' => 1,
        'city_id' => 1
    ];
});
