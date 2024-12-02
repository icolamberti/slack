<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Support\Facades\Route;

// TODO:
// Route::middleware('auth')->group(function () {
//   Route::get('/profile', [ProfileController::class, 'edit'])->name(
//     'profile.edit'
//   );
//   Route::patch('/profile', [ProfileController::class, 'update'])->name(
//     'profile.update'
//   );
//   Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
//     'profile.destroy'
//   );
// });

require __DIR__ . '/auth.php';

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/', [HomeController::class, 'index'])->name('home');

  Route::post('workspaces', [WorkspaceController::class, 'store'])->name(
    'workspaces.store'
  );
  Route::get('workspaces/{id}', [WorkspaceController::class, 'show'])
    ->middleware('workspace-authorization')
    ->name('workspaces.show');
  Route::patch('workspaces/{id}', [WorkspaceController::class, 'update'])
    ->middleware('workspace-admin')
    ->name('workspaces.update');
  Route::delete('workspaces/{id}', [WorkspaceController::class, 'destroy'])
    ->middleware('workspace-admin')
    ->name('workspaces.destroy');
  Route::post('workspaces/{id}/new-join-code', [
    WorkspaceController::class,
    'newJoinCode',
  ])
    ->middleware(['workspace-admin'])
    ->name('workspaces.new-join-code');

  Route::get('workspaces/{workspace}/channels/{channel}', function () {
    return view('channels.show');
  })->name('workspaces.channels.show'); //TODO:
  Route::post('workspaces/{id}/channels', [ChannelController::class, 'store'])
    ->middleware('workspace-admin')
    ->name('workspaces.channels.store');

  Route::get('workspaces/{workspace}/members/{member}', function () {
    return view('channels.show');
  })->name('workspaces.members.show'); //TODO:
});
