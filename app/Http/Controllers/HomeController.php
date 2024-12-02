<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
  public function index()
  {
    $workspaces = Auth::user()->workspaces;

    return inertia('Home', [
      'workspaces' => $workspaces,
    ]);
  }
}
