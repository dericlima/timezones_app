<?php

use Illuminate\Database\Seeder;
use App\Models\Timezone;

class SeedTimezones extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $timezones = config('timezones');

        foreach ($timezones as $value => $timezone) {
            $_timezone = new Timezone();
            $_timezone->name    = $timezone;
            $_timezone->offset  = $value;
            $_timezone->save();
        }
    }
}
