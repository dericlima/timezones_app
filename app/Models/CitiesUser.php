<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CitiesUser
 *
 * @package App\Models
 * @property int $user_id
 * @property int $city_id
 */
class CitiesUser extends Model
{
    protected $table = 'cities_users';

    public function cities()
    {
        return $this->belongsTo(City::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
