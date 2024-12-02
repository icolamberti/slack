<?php

namespace App\Http\Middleware;

use App\Models\Workspace;
use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WorkspaceAuthorization
{
  public function handle(Request $request, Closure $next): Response
  {
    $workspace = Workspace::with(['members'])->findOrFail($request->id);

    if (!$workspace->members->contains('user_id', Auth::id())) {
      abort(403);
    }

    return $next($request);
  }
}
