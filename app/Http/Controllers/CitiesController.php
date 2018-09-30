<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class CitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param $user User
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $cities = $user->cities;

        return response()->json([
           $cities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $city = City::createCity($request->only('name', 'lat', 'long', 'user_id', 'timezone_id'));

        return response()->json([
            'success'   => true,
            'message'   => Lang::get('auth.city_added'),
            'city'      => $city
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  City $city
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, City $city)
    {
        $city = City::updateCity($request->only('name', 'lat', 'long', 'user_id', 'timezone_id'), $city);

        return response()->json([
            'success'   => true,
            'message'   => Lang::get('auth.city_updated'),
            'city'      => $city
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  City  $city
     * @return \Illuminate\Http\Response
     */
    public function destroy($city)
    {
        try {
            $city->delete();
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => Lang::get('general_messages.general_error')
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => Lang::get('general_messages.city_deleted')
        ]);
    }
}
