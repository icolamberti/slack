<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Member extends Model
{
  protected $fillable = ['user_id', 'workspace_id', 'role'];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function workspace(): BelongsTo
  {
    return $this->belongsTo(Workspace::class);
  }
}
