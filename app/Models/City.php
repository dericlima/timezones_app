<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class City
 *
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property float $lat
 * @property float $long
 * @property int $timezone_id
 */
class City extends Model
{
    protected $table = 'cities';

    /**
     * Add a new city
     *
     * @param $data
     * @return CitiesUser
     */
    public static function createCity($data)
    {
        $city               = new City();
        $city->name         = $data['name'];
        $city->lat          = $data['lat'];
        $city->long         = $data['long'];
        $city->timezone_id  = $data['timezone_id'];
        $city->save();

        /** Link city to the user */
        $city_user = new CitiesUser();
        $city_user->user_id = $data['user_id'];
        $city_user->city_id = $city->id;

        return $city_user;
    }

    /**
     * Update a city
     *
     * @param array $data
     * @param City $city
     * @return City
     */
    public static function updateCity($data, $city)
    {
        $city->name         = $data['name'];
        $city->lat          = $data['lat'];
        $city->long         = $data['long'];
        $city->timezone_id  = $data['timezone_id'];
        $city->save();

        return $city;
    }
}
