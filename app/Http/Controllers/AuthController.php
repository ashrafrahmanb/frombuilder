<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\OtpVerificationRequest;
use Mail;
use App\Mail\ActivationMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $otp_code = rand(100000, 999999);
        $endTime = date('H:i:s', strtotime('3 minutes', strtotime(date('H:i:s'))));
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'otp_code' => $otp_code,
            'otp_time' => $endTime,
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->plainTextToken;

        $mailData = [
            'title' => 'Account Activation Code',
            'body' => 'This is for account activation code',
            'name' => $data['name'],
            'otp_code' => $otp_code,
            'footer' => 'This is for account activation code',
            'thanks' => 'Thanks',
            'app_url' => 'devchallenge.com',
            'app_name' => 'Dev Challege Project',
        ];
        Mail::to($data['email'])->send(new ActivationMail($mailData));

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $otp_code = rand(100000, 999999);
        $user = Auth::user();
        $mailData = [
            'title' => 'Login Activation Code',
            'body' => 'This is for account login activation code',
            'name' => $user->name,
            'otp_code' => $otp_code,
            'footer' => 'Please take this code for authorized user',
            'thanks' => 'Thanks',
            'app_url' => 'devchallenge.com',
            'app_name' => 'Dev Challege Project',
        ];
        Mail::to($credentials['email'])->send(new ActivationMail($mailData));

        $endTime = date('H:i:s', strtotime('3 minutes', strtotime(date('H:i:s'))));
        User::where('email', $credentials['email'])->update(['otp_code' => $otp_code, 'otp_time' => $endTime]);
        return response([
            'success' => true
        ]);
    }

    public function otpLoginVerification(OtpVerificationRequest $request)
    {
        $credentials = $request->validated();

        $currentTime = microtime();
        $checkOtp = User::where('email', $credentials['email'])->where('otp_code', $credentials['otp_code'])->first();
        if($checkOtp){
            //if(microtime($checkOtp->otp_time) <= $currentTime){
                $token = $checkOtp->createToken('main')->plainTextToken;

                return response([
                    'user' => $checkOtp,
                    'token' => $token
                ]);
            // }else{
            //     return response([
            //         'error' => 'Activation code is time out!'
            //     ], 422);
            // }
        }else{
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        
    }

    public function otpAccountVerification(OtpVerificationRequest $request)
    {
        $data = $request->validated();

        $currentTime = microtime();
        $checkData = User::where('email', $data['email'])->where('otp_code', $data['otp_code'])->first();
        if($checkData){
            //if(microtime($checkOtp->otp_time) <= $currentTime){
                $token = $checkData->createToken('main')->plainTextToken;
                User::where('email', $data['email'])->update(['email_verified_at' => date('Y-m-d H:i:s')]);
                return response([
                    'user' => $checkData,
                    'token' => $token
                ]);
            // }else{
            //     return response([
            //         'error' => 'Activation code is time out!'
            //     ], 422);
            // }
        }else{
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }

}
