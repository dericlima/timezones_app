<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddCity;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class CitiesController extends Controller
{
    /**
     * Return all cities that belongs to a user account
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cities = auth()->user()->cities;

        return response()->json([
            'success' => true,
            'cities'  => $cities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  AddCity $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddCity $request)
    {
        $city = City::createCity($request->only('name', 'lat', 'long', 'timezone_id'));

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
        $city = City::updateCity($request->only('name', 'user_id', 'timezone_id'), $city);

        return response()->json([
            'success'   => true,
            'message'   => Lang::get('auth.city_updated'),
            'city'      => $city
        ]);
    }

    /**
     * Deletes a city
     *
     * @param  City  $city
     * @return \Illuminate\Http\Response
     */
    public function destroy($city)
    {
        $user = $city->users()
            ->where('cities_users.user_id', auth()->user()->id)
            ->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => Lang::get('general_messages.no_permission')
            ], 403);
        }

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
