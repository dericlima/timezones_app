<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddTimezone;
use App\Models\Timezone;
use App\Models\UserTimezone;

class TimezoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $timezones = Timezone::all();

        return response()->json($timezones);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  AddTimezone  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddTimezone $request)
    {
        $user_timezone = new UserTimezone();
        $user_timezone->user_id = auth()->user()->id;
        $user_timezone->timezone_id = $request->input('timezone_id');
        $user_timezone->save();

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $timezone = Timezone::whereId($id)->first();

        return response()->json([
            'success'   => true,
            'data'      => $timezone
        ]);
    }
}
