<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Channel extends Model
{
  protected $fillable = ['name', 'workspace_id'];

  public function workspace(): BelongsTo
  {
    return $this->belongsTo(Workspace::class);
  }
}
