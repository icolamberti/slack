<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
  public function index()
  {
    //
  }

  public function create()
  {
    //
  }

  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|min:3|max:255',
    ]);

    $workspace = Workspace::findOrFail($request->id);

    $name = strtolower(preg_replace('/\s+/', '-', $request->name));

    $workspace->channels()->create([
      'name' => $name,
    ]);

    session()->flash('success', 'Channel created');
  }

  public function show(string $id)
  {
    //
  }

  public function edit(string $id)
  {
    //
  }

  public function update(Request $request, string $id)
  {
    //
  }

  public function destroy(string $id)
  {
    //
  }
}
