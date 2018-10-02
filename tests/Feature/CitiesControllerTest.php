<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\TestDataProvider;

class CitiesControllerTest extends TestCase
{
    use TestDataProvider;

    /**
     * @test
     */
    public function it_should_return_a_error_message_when_token_is_not_provided()
    {
        $response = $this->withHeaders([
                'Accept' => 'application/json',
                'X-Requested-With'  => 'XMLHttpRequest']
        )->get('api/cities');

        $response->assertStatus(403)
            ->assertJson([
               'message' => 'Unauthorized'
            ]);
    }

    /**
     * @test
     */
    public function it_should_return_a_success_message_when_user_has_cities()
    {
        $data['user'] = $this->createUser();
        $this->createCity($data['user']);

        $response = $this->actingAs($data['user'])
            ->get('api/cities');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true
            ]);
    }

    /**
     * @test
     */
    public function it_should_return_a_empty_array_when_a_user_doesnt_have_any_city()
    {
        $data['user'] = $this->createUser();

        $response = $this->actingAs($data['user'])
            ->get('api/cities');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'cities' => []
            ]);
    }

    /**
     * @test
     */
    public function it_should_add_a_new_city()
    {
        $data['user'] = $this->createUser();
        $response = $this->actingAs($data['user'])
            ->post('api/add_city', [
                'name'  => 'New Town',
                'lat'   => 10.23464,
                'long'  => 40.12354,
                'timezone_id' => 3
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'New city added with success!'
            ]);
    }


    /**
     * @test
     */
    public function it_should_see_a_error_message_when_some_required_field_is_missing()
    {
        $data['user'] = $this->createUser();
        $response = $this->actingAs($data['user'])
            ->post('api/add_city', [
                'name'  => 'New Town',
                'timezone_id' => 3
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'The given data was invalid.',
                'errors' => [
                    'lat'  => ['The lat field is required.'],
                    'long' => ['The long field is required.'],
                ]
            ]);
    }

    /**
     * @test
     */
    public function it_should_update_a_city_data()
    {
        $data['user'] = $this->createUser();
        $city = $this->createCity($data['user']);
        $response = $this->actingAs($data['user'])
            ->post('api/update_city/' . $city['city']->id, [
                'name'  => 'Old Town'
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'city' => [
                    'name' => 'Old Town'
                ]
            ]);
    }

    /**
     * @test
     */
    public function it_should_keep_the_same_city_data_if_new_data_is_missing()
    {
        $data['user'] = $this->createUser();
        $city = $this->createCity($data['user']);
        $response = $this->actingAs($data['user'])
            ->post('api/update_city/' . $city['city']->id, []);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'city' => [
                    'name' => $city['city']->name
                ]
            ]);
    }

    /**
     * @test
     */
    public function it_should_delete_a_city()
    {
        $data['user'] = $this->createUser();
        $city = $this->createCity($data['user']);
        $response = $this->actingAs($data['user'])
            ->delete('api/city/' . $city['city']->id, []);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'City deleted with success!'
            ]);
    }

    /**
     * @test
     */
    public function it_should_send_a_error_message_when_the_user_doesnt_have_permission()
    {
        $data['user'] = $this->createUser();
        $data['user2'] = $this->createUser();
        $city = $this->createCity($data['user2']);
        $response = $this->actingAs($data['user'])
            ->delete('api/city/' . $city['city']->id, []);

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'You do not have permission to execute this operation'
            ]);
    }
}
