<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
  use HasFactory, Notifiable;

  protected $fillable = [
    'name',
    'email',
    'password',
    'email_verified_at',
    'google_id',
    'facebook_id',
    'avatar',
  ];

  protected $hidden = ['password', 'remember_token'];

  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function members(): HasMany
  {
    return $this->hasMany(Member::class);
  }

  public function workspaces(): HasManyThrough
  {
    return $this->hasManyThrough(
      Workspace::class,
      Member::class,
      'user_id',
      'id',
      'id',
      'workspace_id'
    );
  }
}
