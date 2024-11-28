<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class FacebookLoginController extends Controller
{
  public function redirectToFacebook(): RedirectResponse
  {
    return Socialite::driver('facebook')->redirect();
  }

  public function handleFacebookCallback(): RedirectResponse
  {
    $facebookUser = Socialite::driver('facebook')->user();

    $user = User::where('email', $facebookUser->email)->first();

    if ($user) {
      $user->update([
        'facebook_id' => $facebookUser->id,
        'name' => $facebookUser->name,
        'avatar' => $facebookUser->avatar,
      ]);

      if (!$user->email_verified_at) {
        $user->update([
          'email_verified_at' => now(),
        ]);
      }
    } else {
      $user = User::create([
        'facebook_id' => $facebookUser->id,
        'name' => $facebookUser->name,
        'email' => $facebookUser->email,
        'email_verified_at' => now(),
        'avatar' => $facebookUser->avatar,
        'password' => Hash::make(Str::password(12)),
      ]);
    }

    Auth::login($user, true);

    return redirect()->intended(route('home'));
  }
}
