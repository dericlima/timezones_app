<?php

namespace Tests;


use App\Models\CitiesUser;
use App\Models\City;
use App\Models\User;

trait TestDataProvider
{
    public function createUser()
    {
        return factory(User::class)->create([]);
    }

    public function createCity($user = null)
    {
        $permission = null;
        $city = factory(City::class)->create([]);
        if ($user) {
            $permission = factory(CitiesUser::class)->create([
                'user_id' => $user->id,
                'city_id' => $city->id
            ]);
        }

        return [
            'city' => $city,
            'permission' => $permission
        ];
    }
}