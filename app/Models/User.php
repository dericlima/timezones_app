<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 *
 * @package App\Models
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $password_confirmation
 * @property string $permission
 * @property-read object cities
 */
class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'permission'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Return all cities that belongs to a user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function cities()
    {
        return $this->belongsToMany(City::class, 'cities_users');
    }

    /**
     * Add a new user
     *
     * @param $data
     * @return User
     */
    public static function createUser($data)
    {
        $user               = new User();
        $user->name         = $data['name'];
        $user->email        = $data['email'];
        $user->password     = bcrypt($data['password']);
        $user->permission   = 'regular';
        $user->save();

        return $user;
    }
}
