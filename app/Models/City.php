<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
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
    use SoftDeletes;

    protected $table = 'cities';

    protected $hidden = ['pivot', 'timezone_id'];

    protected $dates = ['deleted_at'];

    /**
     * Return all users that have this city
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'cities_users');
    }

    public function timezone()
    {
        return $this->belongsTo(Timezone::class);        
    }

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
        $city_user->user_id = auth()->user()->id;
        $city_user->city_id = $city->id;
        $city_user->save();

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
        foreach ($data as $key => $value) {
            $city->{$key} = $value;
        }
        $city->save();

        return $city;
    }

    /**
     * Cast model values to a array
     *
     * @return array
     */
    public function toArray()
    {
        $data = parent::toArray();
        $data['timezone'] = $this->timezone;

        return $data;
    }
}
