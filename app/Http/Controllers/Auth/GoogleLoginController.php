<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleLoginController extends Controller
{
  public function redirectToGoogle(): RedirectResponse
  {
    return Socialite::driver('google')->redirect();
  }

  public function handleGoogleCallback(): RedirectResponse
  {
    $googleUser = Socialite::driver('google')->user();

    $user = User::where('email', $googleUser->email)->first();

    if ($user) {
      $user->update([
        'google_id' => $googleUser->id,
        'name' => $googleUser->name,
        'avatar' => $googleUser->avatar,
      ]);

      if (!$user->email_verified_at) {
        $user->update([
          'email_verified_at' => now(),
        ]);
      }
    } else {
      $user = User::create([
        'google_id' => $googleUser->id,
        'name' => $googleUser->name,
        'email' => $googleUser->email,
        'email_verified_at' => now(),
        'avatar' => $googleUser->avatar,
        'password' => Hash::make(Str::password(12)),
      ]);
    }

    Auth::login($user, true);

    return redirect()->intended(route('home'));
  }
}
