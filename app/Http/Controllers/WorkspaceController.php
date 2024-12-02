<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Auth;
use Illuminate\Http\Request;
use Str;

class WorkspaceController extends Controller
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

    $user = Auth::user();

    $workspace = Workspace::create([
      'user_id' => $user->id,
      'name' => $request->name,
      'join_code' => Str::random(6),
    ]);

    $user->members()->create([
      'workspace_id' => $workspace->id,
      'role' => 'admin',
    ]);

    $workspace->channels()->create([
      'name' => 'general',
    ]);

    return to_route('workspaces.show', $workspace->id)->with(
      'success',
      'Workspace created'
    );
  }

  public function show(string $id)
  {
    $workspace = Workspace::with([
      'members',
      'members.user',
      'channels',
    ])->findOrFail($id);

    $workspaces = Auth::user()->workspaces;

    return inertia('Workspaces/Show', [
      'workspace' => $workspace,
      'workspaces' => $workspaces,
    ]);
  }

  public function edit(string $id)
  {
    //
  }

  public function update(Request $request, string $id)
  {
    $request->validate(
      [
        'name' => 'required|string|min:3|max:80',
      ],
      [],
      [
        'name' => 'Workspace name',
      ]
    );

    Workspace::findOrFail($id)->update([
      'name' => $request->name,
    ]);

    session()->flash('success', 'Workspace updated');
  }

  public function destroy(string $id)
  {
    Workspace::findOrFail($id)->delete();

    session()->flash('success', 'Workspace deleted');

    $workspaces = Auth::user()->workspaces;

    if (count($workspaces)) {
      return to_route('workspaces.show', $workspaces->first()->id);
    } else {
      return to_route('home');
    }
  }

  public function newJoinCode(string $id)
  {
    $workspace = Workspace::findOrFail($id);

    $workspace->update([
      'join_code' => Str::random(6),
    ]);

    session()->flash('success', 'Invite code regenerated');
  }
}
