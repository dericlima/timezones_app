<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddTimezone;
use App\Models\Timezone;
use App\Models\UserTimezone;
use Illuminate\Http\Request;

class TimezoneController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt-auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $timezones = Timezone::all();

        return response()->json([
            'success' => true,
            'data' => $timezones
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
