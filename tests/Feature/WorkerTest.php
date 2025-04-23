<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class WorkerTest extends TestCase
{

    public function test_it_requires_all_fields(): void
    {
        $response = $this->postJson('/api/workers/create', []);

        $response->assertStatus(422) // Проверяем, что валидация не пропустила запрос
        ->assertJsonValidationErrors(['full_name', 'image', 'post']);
    }
}
