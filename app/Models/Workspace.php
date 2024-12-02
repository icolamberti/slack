<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workspace extends Model
{
  protected $fillable = ['name', 'user_id', 'join_code'];

  public function channels(): HasMany
  {
    return $this->hasMany(Channel::class);
  }

  public function members(): HasMany
  {
    return $this->hasMany(Member::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
